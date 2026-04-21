import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';

type VideoRegistry = {
  pages: Record<string, RegistryPage>;
};

type RegistryPage = {
  columns: RegistryColumn[];
};

type RegistryColumn = {
  heading: string;
  intro: string;
  videos: RegistryVideo[];
};

type RegistryVideo = {
  slot: string;
  title: string;
  description: string;
  youtubeUrl: string;
  transcriptFile: string;
};

export type PageVideo = {
  slot: string;
  title: string;
  description: string;
  youtubeUrl: string;
  transcript: string[];
};

export type PageVideoColumn = {
  heading: string;
  intro: string;
  videos: PageVideo[];
};

@Injectable({
  providedIn: 'root',
})
export class KlptVideoContentService {
  private readonly http = inject(HttpClient);
  private readonly registryPath = 'assets/content/videos/video-registry.json';

  getPageColumns(pageKey: string): Observable<PageVideoColumn[]> {
    return this.http.get<VideoRegistry>(this.registryPath).pipe(
      map((registry) => registry.pages[pageKey]?.columns ?? []),
      switchMap((columns) => {
        if (!columns.length) {
          return of(<PageVideoColumn[]>[]);
        }

        return forkJoin(columns.map((column) => this.mapColumn(column)));
      }),
    );
  }

  private mapColumn(column: RegistryColumn): Observable<PageVideoColumn> {
    return forkJoin(column.videos.map((video) => this.mapVideo(video))).pipe(
      map((videos) => ({
        heading: column.heading,
        intro: column.intro,
        videos,
      })),
    );
  }

  private mapVideo(video: RegistryVideo): Observable<PageVideo> {
    return this.http.get(video.transcriptFile, { responseType: 'text' }).pipe(
      map((transcriptText) => ({
        slot: video.slot,
        title: video.title,
        description: video.description,
        youtubeUrl: video.youtubeUrl,
        transcript: transcriptText
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean),
      })),
    );
  }
}
