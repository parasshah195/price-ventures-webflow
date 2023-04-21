Proper video encoding is essential. Need to re-arrange the video frames in a way where each frame is a keyframe
That will avoid the jumpiness

The FFMPEG CLI code used to achieve that:

### MP4 compression

`ffmpeg -i price-ventures-web-loop-compressed.mp4 -filter:v "setpts=0.1*PTS" -s 1920x1080 -r 30 -g 1 -movflags faststart -c:v libx264 -b:v 1M -crf 28 -an -pix_fmt yuv420p price-ventures-header-1920w-7s-1mBit-crf28.mp4`

### WebP compression

`ffmpeg -i price-ventures-web-loop-compressed.mp4 -filter:v "setpts=0.25*PTS" -s 1280x720 -r 30 -movflags faststart -c:v libvpx-vp9 -b:v 500K -crf 30 -an -g 1 -pix_fmt yuv420p price-ventures-header-1280-encoded.webm`

Note:

- `-filter:v "setpts=0.25*PTS"` speeds up the video duration to a quarter (1/4th) of its current duration
- The `-crf 30` is the video quality. The lower the number, better the quality. 20-30 is usually considered good enough balance between quality and compression
- `-b:v 500K` is the bitrate (`500k` stands for 500kb. Higher the bitrate, higher the video quality)
- `price-ventures-web-loop-compressed.mp4` is the source file. Change the name to the video file name in the folder

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/web-platform-jirmlp)
