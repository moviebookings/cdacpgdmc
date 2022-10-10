```SQL
SELECT MovieTitle,MovieLanguage,MovieGenre,ReleseDate,MovieDuration,MovieCertificate,MovieCast,
    MovieDirector FROM movie
SELECT TheaterName FROM theater
SELECT StartTime,EndTime FROM shows

SELECT t.TheaterName,s.ScreenId,m.MovieTitle,m.MovieLanguage,m.MovieGenre,m.MovieDuration,m.MovieCertificate
,s.StartTime,s.EndTime FROM movie m INNER JOIN shows s ON s.MovieId = m.MovieId
INNER JOIN theater t ON m.MovieId = t.MovieId;
```