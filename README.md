# <img src="https://raw.githubusercontent.com/eyezahhhh/jukeblade/refs/heads/main/ui/public/favicon-512x512.png" alt="Jukeblade logo" width="35" height="35" /> Jukeblade

Jukeblade runs on my Raspberry Pi to control my Sony CDP CX-235 200-disc CD changer. Using Jukeblade I can control every function of my CD changer from my phone or laptop.

## How does it work?

My CD changer is from the nineties and has no good way to interface with a computer. Jukeblade sends IR commands via an LED, basically pretending to be the CD changer's remote control. After ironing out a few kinks, this approach seems to work with shocking reliability.

I also use Jukeblade to store the metadata for my CD library instead of using the CD CX-235's built-in memory. Jukeblade supports searching for releases/albums via [MusicBrainz](https://musicbrainz.org) to save me from having to manually input each track title (for most CDs at least). Eventually I want Jukeblade to copy this metadata over to the CD changer.

## Project structure

This is a monorepo so both the API and web-UI are included in this repository. The API depends on `ir-ctl` to send IR signals. an IR emitter will need to be defined using LIRC.