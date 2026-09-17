# Where's Waldo

A browser-based "Where's Waldo" game — find Waldo and double click (or tap) on him to advance to the next level. Built with vanilla JS and Canvas, served by a hand-written x86-64 assembly HTTP server.

Made in MC Lab — for those sleepless nights @jw4js

<p align="center"><img src="media/waldo_demo.gif?v=2" alt="Demo screen"></p>

## How to play

Double click (or tap) the area where you think Waldo is. If you're right, you'll move on to the next level. There are four levels in total.

## Tech

- Front end: vanilla JavaScript + Canvas, no frameworks
- Background images scale to fit any screen size and are hidden from devtools/view-source to keep players from cheating
- Backend: a minimal HTTP server written directly in x86-64 assembly (`server/server.asm`)

## Challenges we ran into

- Scaling properly across different screen sizes
- Switching game levels, i.e. changing the game background
- Hiding the game background so players can't open devtools and see the complete image

## Original idea

Match the selected area to Waldo's face using a ratio: `ori_wal_face / ori_back_img = usr_image / usr_device_size`. Turned out Firefox didn't support this approach. (Strongly suspect it's because my brother had JS disabled in his browser =.=.)

## What we ended up building

- Classic front end, solved with Canvas
- CSS for layout and styling
- Background magic

## potential TODOs

- Opening scene and player guides
- Transition animations between levels
- Ending hints
- Timer and score counter

## Support this project

<p>
  <a href="https://www.buymeacoffee.com/zoetian">
    <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buymeacoffee&logoColor=black" alt="Buy Me a Coffee">
  </a>
</p>

If you had fun finding Waldo, consider buying me a coffee — it helps keep
these tiny projects like this one going.
