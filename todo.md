I want to replicate https://aahrvatska.org/ located in git folder but with Quasar framework, which would enable styling (skins), dark-light mode, unified component sytem, drawer navigation, etc. It is also much better than vanilla js and html, because it uses typescript.

Site has 7 pages, 4 main pages (index, o-nama, literatura, informacije) and 3 additional (privatnost, reset, help)
App is PWA, so it uses service worker and manifest.json. It can be installed on mobile devices and it works offline.
I would like to copy style of the old site, but with Quasar components.
New site is located in next folder.
New site would have also some additional stuff regarding navigation.
On the left side of menu we will have hamburger for left drawer, which will have two tabs: site navigation (default) and site tools - settings (light/dark mode, site font size, etc.)
On the right side of menu we will have hamburger for right drawer, which will have two tabs: page navigation and page tools. Page literatura has the most tools (bookmarks, text font size adjustment, etc.)
Old site is based on Mobirise, so pages have sections (blocks)
4 main pages:
- index.html - header with button Sastanci, Imate problem s alkoholom? with button and video, Swiper with 6 cards for main content on the site, Sastanci with Zoom button, Kontakt, Susjedne Grupe (with swiper), Zivi Sastanci (with expanding sections for live groups), Footer 
- informacije.html - Informacije o A.A. - header section with video and button Kako A.A. djeluje, Clanovi o sebi, Osnivanje A.A. with 3 tabs, Anonimnost u A.A. with 3 tabs, Pitanja i odgovori (with expanding sections for questions and answers), Footer 
- literatura.html - header with video and button, Dnevna razmatranja with calendar (only on desktop) dropdown and text, Čitaonica: 4 books with covers and short description, Book reader (with bookmarks, font size adjustment, etc.), Footer 
- o-nama.html - O nasoj grupi - header with video and button Kalkulator trijeznosti (this will go to site tools), Moji dani trijeznosti with sobriety calculations, greetings and medalions, Molitva spokoja, Vijesti, Poveznice, Footer 

Additional pages:
- privatnost.html - Privacy policy
- reset.html - Service worker reset (in case of major changes)
- help.html - Help page

Under the top bar is also badge with sobriety days, which is visible when user enters sobriety date.

The most important page is literatura.html. It has Dnevna razmatranja with calendar (only on desktop) dropdown and text and it has book reader (as for now we have 4 books in library, but we will add another books soon).
All books are in json format and they are located in git\assets\books
For old site format of json was tailored to work with calendar library (dnevna razmatranja) and with choices.js library (for choices dropdown which we already removed, so I would like to unify book json format for all books).
This would simplify our pdf creator so we would not need two separate generators (for books and for dnevna razmatranja) and two separate tabs in git\pdf_creator\source\UI\pdf_config_ui.py.

Pdf generator is located in git\pdf_creator folder. It is python script which uses reportlab to generate pdf files from json data. Since our books are mostly done with OCR from phisical books, we have a lot of grammar and spelling errors in text. As we correct some errors, I use pdf_creator to generate pdf files with corrected text. So this is ongoing process and we will improve text quality over time.

For the quasar framework I would like to have these targets: PWA, Mobile app, Electron. I think that instead of Capacitor it would be better to create TWA, which would be just a thin wrapper around PWA to enable styling of system navigation (three-key navigation bar, which chrome does not support for PWA). So for TWA we would just add manifest and icons. Everything else (updating, etc.) would be done via service worker in PWA.

I already created quasar folder next\aahrvatska with quasar installed and working.

I'm using work.sh and update.sh for versioning, deploying, etc. I already copied work.sh to quasar folder and this file we will be using for any commands related to the app.

I would also like to find a way to switch service worker on/off to enable simpler development and debugging. On the old site when we make any change on the site, I need to run page with liveserver, then I need to upgrade app on localhost if I want to see changes and only then I can test new functionality. So for testing I would like to be able to skip service worker with some command and -d flag in work.sh (for example w q -d for work.sh - shortcut for bash work.sh quasar --development). But before I deploy site to github/netlify, I would normally want to build also service worker to test if everything is working correctly also with service worker/offline, etc.
For this I would use command: w q -ds (shortcut for bash work.sh quasar --development --service-worker)
I already have alias w="bash work.sh" in my .bashrc file.

Can you please study git folder to understand the structure, style, etc. of the old site (currently live) and then start working on new site in quasar folder.

Please make a working plan, which we should discuss and agree on before you start working on the site.

Localstorage:
- sobriety date
- theme
- font size
- bookmarks
- last viewed book
- last viewed chapter
- last page navigated


Book structure:
- bookId
- bookTitle
- bookSubtitle
- cover
- description
- entries
  - bookPartTitle
  - bookPartSubtitle
  - bookPartEntries
  - entryId
  - date
  - title
  - subtitle
  - header
  - text
  - source


