"""Build website derivatives from the owner's export. Usage: python3 scripts/prepare-media.py SOURCE_DIR
Requires ffmpeg and ffprobe. Originals are read only. Videos are silent excerpts.
"""
import json
import subprocess
import sys
from pathlib import Path

source = Path(sys.argv[1]).expanduser()
output = Path(__file__).resolve().parents[1] / 'public/media'
output.mkdir(parents=True, exist_ok=True)
photos = [
    ('between-dives', 'IMG_1576.JPG', 'A spearfisher sits on the boat with a coastal rock arch behind him.', 'Between dives', 'A moment above the surface.'),
    ('back-at-the-boat', 'IMG_1577.JPG', 'A masked spearfisher holds a catch in the water beside the boat.', 'Back at the boat', 'The view from the other side of the rail.'),
    ('blue-water-catch', 'IMG_1580.JPG', 'A smiling spearfisher holds a large silver catch with blue water and cliffs behind him.', 'A moment worth keeping', 'Back aboard, with a story to tell.'),
    ('two-catches', 'IMG_1583.JPG', 'Two spearfishers sit aboard a blue boat holding their catches against a coastal backdrop.', 'Better together', 'Shared days. Shared stories.'),
    ('catch-closeup', 'IMG_1586.JPG', 'A smiling spearfisher holds a silver catch beside his shoulder.', 'That feeling', 'A face that says it all.'),
    ('on-the-boat', 'IMG_1590.JPG', 'A spearfisher sits on a blue boat holding his equipment with green cliffs across the water.', 'The time in between', 'Salt on your skin. Blue in every direction.'),
    ('sunset-return', 'IMG_2826.jpeg', 'A person sits at the bow of an outrigger boat with catches on the deck and the sun setting ahead.', 'The way home', 'Last light on the water.'),
    ('sunset-crew', 'IMG_2838.jpeg', 'Two smiling spearfishers sit on a blue boat behind their catches at sunset.', 'One for the memories', 'The end of a day on the water.'),
    ('boat-day', 'IMG_3282.jpeg', 'Three people pose with catches beneath the canopy of a colorful fishing boat.', 'A day together', 'Good company, all the way back.'),
    ('at-the-surface', '7282d3f7934fc685d7a0f03a0e5f9139.jpeg', 'Divers wearing masks and long fins float at the surface of the open sea.', 'At the surface', 'A little time in the blue.'),
]
videos = [
    ('coastal-run', 'DJI_20260702121816_0003_D.mov', 0, 22, 7, 'Along the coast', 'An aerial view follows a boat across blue water beside a coastal rock arch.'),
    ('below-the-surface', 'player_export.mov', 0, 15, 7, 'Below the surface', 'An underwater view follows a diver through blue water and back toward the surface.'),
    ('heading-home', 'GX010216.mov', 0, 25, 2, 'Heading home', 'A sunset boat ride, with the day’s catches on deck and the wake stretching behind.'),
]
def run(args):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *args], check=True)
def size(path):
    return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','stream=width,height','-of','json',str(path)]))['streams'][0]
def picture(name, file, at=None):
    for width in [640,1280]:
        args=[] if at is None else ['-ss',str(at)]
        run([*args,'-i',str(source/file),'-frames:v','1','-vf',f"scale='min({width},iw)':-2",'-q:v','3','-map_metadata','-1',str(output/f'{name}-{width}.jpg')])
    return size(output/f'{name}-1280.jpg')
manifest={'photos':[], 'videos':[]}
for name,file,alt,title,caption in photos:
    dimensions=picture(name,file)
    manifest['photos'].append(dict(id=name,original=file,alt=alt,title=title,caption=caption,**dimensions))
for name,file,start,duration,poster,title,description in videos:
    dimensions=picture(name,file,poster)
    run(['-ss',str(start),'-i',str(source/file),'-t',str(duration),'-an','-vf',"scale='min(1280,iw)':-2",'-c:v','libx264','-preset','medium','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart','-map_metadata','-1',str(output/f'{name}.mp4')])
    manifest['videos'].append(dict(id=name,original=file,title=title,description=description,start=start,duration=duration,posterTime=poster,audio=False,**dimensions))
# Source mapping stays out of the public directory.
(output.parents[1]/'app/media-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(f'Prepared {len(photos)} photos and {len(videos)} silent clips.')
