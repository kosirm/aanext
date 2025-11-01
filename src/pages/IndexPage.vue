<template>
  <q-page class="index-page">
    <!-- Hero Section -->
    <section
      id="hero"
      class="hero-section mbr-parallax-background"
      style="background-image: url('/assets/images/header.webp');"
      v-touch-swipe.mouse.horizontal="handleSwipe"
    >
      <div class="mbr-overlay"></div>
      <div class="hero-content q-pa-xl text-white text-center">
        <h1 class="text-h1 q-mb-md header-title">
          <strong>Anonimni Alkoholičari Hrvatske 51</strong>
        </h1>
        <p class="text-h4 q-mb-lg">Grupa Prvi Korak Osijek</p>
        <p class="text-italic text-h5 q-mb-xl">Dovedi tijelo i um će ga slijediti.</p>
        <q-btn
          color="primary"
          label="Sastanci"
          size="lg"
          to="#sastanci"
          class="q-px-xl"
        />
      </div>
    </section>

    <!-- Problem Section -->
    <section id="problem" class="content-section q-pa-lg bg-white">
      <div class="container">
        <div class="row items-center">
          <!-- Video on the left -->
          <div class="col-12 col-md-6 q-pa-md">
            <video
              ref="videoPlayer"
              class="video-player full-width"
              controls
              :poster="`/videos/imam_nadu_thumbnail.jpg`"
              @ended="resetVideo"
            >
              <source src="/videos/imam_nadu.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <!-- Text content on the right -->
          <div class="col-12 col-md-6 q-pa-md">
            <h2 class="text-h3 text-weight-bold q-mb-md">
              <strong>Imate problem s alkoholom? Postoji rješenje.</strong>
            </h2>
            <p class="text-h6 q-mb-lg">
              A.A. ima jednostavan program koji djeluje. Temelji se na tome da jedan alkoholičar pomaže drugome.
            </p>
            <q-btn
              color="primary"
              label="Saznaj više"
              size="lg"
              to="/informacije"
              class="q-px-xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Shortcuts Carousel -->
    <section id="shortcuts" class="carousel-section">
      <div class="section-container">
        <div class="shortcuts-swiper-wrapper">
          <Swiper
            ref="swiperRef"
            :modules="swiperModules"
            :slides-per-view="1"
            :space-between="0"
            :loop="true"
            :touch-start-prevent-default="false"
            :simulate-touch="true"
            :allow-touch-move="true"
            :touch-ratio="1"
            :touch-angle="45"
            :long-swipes="true"
            :long-swipes-ratio="0.5"
            :long-swipes-ms="300"
            :follow-finger="true"
            :short-swipes="true"
            :threshold="5"
            :touch-release-on-edges="true"
            direction="horizontal"
            :touches-direction="'horizontal'"
            :autoplay="{
              delay: 6000,
              disableOnInteraction: false,
            }"
            :speed="1000"
            :pagination="{
              clickable: true,
            }"
            :keyboard="{
              enabled: true,
            }"
            :breakpoints="{
              486: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              776: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              1480: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              1920: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
            }"
            class="shortcuts-swiper"
            @autoplay-time-left="onAutoplayTimeLeft"
          >
            <SwiperSlide
              v-for="(card, index) in shortcutCards"
              :key="index"
              :class="card.slideClass"
            >
              <div :class="['card-bg', card.bgClass]"></div>
              <div class="card">
                <div :class="['card-image', card.imageClass]"></div>
                <div class="card-text-div">
                  <p class="card-text">{{ card.text }}</p>
                </div>
                <div class="card-button">
                  <q-btn
                    color="primary"
                    :label="card.buttonLabel"
                    :to="card.link"
                    class="slide-btn"
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <!-- Autoplay progress -->
          <div class="autoplay-progress">
            <svg viewBox="0 0 48 48" ref="progressCircle">
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Meetings Section -->
    <section id="sastanci" class="content-section q-pa-lg bg-grey-2">
      <div class="container">
        <div class="row">
          <!-- Text content - left on desktop, bottom on mobile -->
          <div class="col-12 col-md-6 q-pa-md sastanci-text">
            <h2 class="sastanci text-weight-bold q-mb-md">
              <strong>Sastanci</strong>
            </h2>
            <p class="text-h6 q-mb-lg">
              Pošto se u vrijeme korone sastanci nisu mogli održavati uživo, naša grupa je počela sa sastancima <strong>online</strong> pomoću aplikacije <strong>ZOOM</strong>.<br><br>
              Sastanci naše grupe se održavaju:<br>
              <strong>Utorak: 18:45</strong><br>
              <strong>Četvrtak: 18:45</strong><br>
              <strong>Subota: 09:00</strong><br><br>
              Za spajanje na sastanke kliknite na gumb "Otvori Zoom" kada se želite pridružiti.
            </p>
            <q-btn
              color="primary"
              label="Otvori Zoom"
              icon-right="launch"
              size="lg"
              href="https://us02web.zoom.us/j/74310661095?pwd=SWxOL3Z0RFBtR2g0cUYyRExBc2FBZz09"
              target="_blank"
              class="q-px-xl"
            />
          </div>

          <!-- Image - right on desktop, top on mobile -->
          <div class="col-12 col-md-6 q-pa-md sastanci-image">
            <div class="flex flex-center">
              <img
                src="assets/images/zoom.webp"
                alt="Sastanci se održavaju online"
                style="max-width: 100%; max-height: 400px; width: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="content-section q-pa-lg">
      <div class="container">
        <div class="row justify-center q-mb-lg">
          <div class="col-12 text-center">
            <hr class="q-my-lg" style="border-top: 1px solid #ddd; width: 100%;">
            <h2 class="kontakt text-weight-bold q-my-lg">Kontakt</h2>
            <hr class="q-my-lg" style="border-top: 1px solid #ddd; width: 100%;">
          </div>
        </div>

        <div class="row q-col-gutter-md">
          <!-- Phone -->
          <div class="col-12 col-md-4 text-center q-pa-md">
            <div class="contact-item">
              <q-btn
                round
                color="primary"
                icon="phone"
                size="lg"
                href="tel:+385955041511"
                class="q-mb-sm"
              />
              <h4 class="text-h6 text-weight-bold q-my-sm">Telefon</h4>
              <a href="tel:+385955041511" class="text-primary text-h6">+385 95 504 15 11</a>
            </div>
          </div>

          <!-- WhatsApp -->
          <div class="col-12 col-md-4 text-center q-pa-md">
            <div class="contact-item">
              <q-btn
                round
                color="primary"
                icon="chat"
                size="lg"
                href="https://api.whatsapp.com/send?phone=385955041511"
                class="q-mb-sm"
              />
              <h4 class="text-h6 text-weight-bold q-my-sm">WhatsApp</h4>
              <a href="https://api.whatsapp.com/send?phone=385955041511" class="text-primary text-h6">Poziv / Chat / Video</a>
            </div>
          </div>

          <!-- Email -->
          <div class="col-12 col-md-4 text-center q-pa-md">
            <div class="contact-item">
              <q-btn
                round
                color="primary"
                icon="email"
                size="lg"
                href="mailto:info@aahrvatska.org"
                class="q-mb-sm"
              />
              <h4 class="text-h6 text-weight-bold q-my-sm">Email</h4>
              <a href="mailto:info@aahrvatska.org" class="text-primary text-h6">info@aahrvatska.org</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Susjedne Grupe Title Section -->
    <section id="susjedne-grupe" class="content-section q-pa-lg">
      <div class="container">
        <div class="row justify-center">
          <div class="col-12 text-center">
            <hr class="q-my-lg" style="border-top: 1px solid #ddd; width: 100%;">
            <h2 class="text-weight-bold q-my-lg" style="font-size: var(--font-size-4xl); color: var(--q-primary);">Susjedne online grupe</h2>
            <hr class="q-my-lg" style="border-top: 1px solid #ddd; width: 100%;">
          </div>
        </div>
      </div>
    </section>

    <!-- Grupe Swiper Section -->
    <section id="swiper-grupe" class="grupe-swiper-section" style="width: 100vw; margin-left: calc(-50vw + 50%); padding: 0 0;">
      <div class="container-fluid">
        <div class="grupe-swiper-wrapper">
          <Swiper
            ref="grupeSwiperRef"
            :modules="swiperModules"
            :slides-per-view="1"
            :space-between="0"
            :loop="true"
            :touch-start-prevent-default="false"
            :simulate-touch="true"
            :allow-touch-move="true"
            :touch-ratio="1"
            :touch-angle="45"
            :long-swipes="true"
            :long-swipes-ratio="0.5"
            :long-swipes-ms="300"
            :follow-finger="true"
            :short-swipes="true"
            :threshold="5"
            :touch-release-on-edges="true"
            direction="horizontal"
            :touches-direction="'horizontal'"
            :autoplay="{
              delay: 6000,
              disableOnInteraction: false,
            }"
            :speed="1000"
            :pagination="{
              clickable: true,
            }"
            :keyboard="{
              enabled: true,
            }"
            :breakpoints="{
              486: { slidesPerView: 1, spaceBetween: 0 },
              776: { slidesPerView: 2, spaceBetween: 0 },
              1480: { slidesPerView: 3, spaceBetween: 0 },
              1920: { slidesPerView: 4, spaceBetween: 0 },
            }"
            class="grupe-swiper"
            @autoplay-time-left="onGrupeAutoplayTimeLeft"
          >
            <SwiperSlide
              v-for="(grupa, index) in grupeCards"
              :key="index"
              :class="`slide-${index + 1}`"
            >
              <div class="card-bg" :class="`bg-${index + 1}`"></div>
              <div class="card" :id="`card-${index + 1}`">
                <div class="card-image" :class="`g-${index + 1}`">
                  <div class="card-text-overlay">
                    <span class="grupa-naslov">{{ grupa.title }}</span>
                    <span v-if="grupa.note" class="note">{{ grupa.note }}</span>
                  </div>
                </div>
                <div class="card-text-div" :class="`card-text-${index + 1}`">
                  <p class="card-text-grupe" v-html="grupa.schedule"></p>
                </div>
                <div class="card-button">
                  <q-btn
                    color="primary"
                    label="Otvori Zoom"
                    :href="grupa.link"
                    target="_blank"
                    class="slide-btn"
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <!-- Autoplay progress -->
          <div class="autoplay-progress">
            <svg viewBox="0 0 48 48" ref="grupeProgressCircle">
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref="grupeProgressContent"></span>
          </div>
        </div>
      </div>
    </section>

    <!-- Živi Sastanci Title Section -->
    <section id="zivi-sastanci" class="content-section q-pa-lg">
      <div class="container">
        <div class="row justify-center">
          <div class="col-12 text-center">
            <hr class="q-my-lg" style="border-top: 1px solid #ddd; width: 100%;">
            <h2 class="text-weight-bold q-my-lg" style="font-size: var(--font-size-4xl); color: var(--q-primary);">Živi sastanci</h2>
            <hr class="q-my-lg" style="border-top: 1px solid #ddd; width: 100%;">
          </div>
        </div>
      </div>
    </section>

    <!-- Live Meetings Expandable Section -->
    <section id="live-meetings" class="content-section live-meetings-expandable q-pa-lg">
      <div class="container">
        <div class="row justify-center">
          <div class="col-12 col-md-10">
            <q-list>
              <!-- Zagreb -->
              <q-expansion-item
                v-model="liveMeetings.zagreb"
                icon="place"
                label="Zagreb"
                header-class="text-weight-bold text-h6"
              >
                <q-card>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <!-- Text Content -->
                      <div class="col-12 col-md-6">
                        <h6 class="text-h6 text-weight-bold q-mb-md">
                          Grupa Trijezni u Zagrebu<br>
                          Crkva Mati Slobode, Ul. don Petra Šimića 1, Zagreb
                        </h6>

                        <div class="meeting-info-item q-mb-md">
                          <q-icon name="groups" size="50px" color="deep-orange-5" class="q-mb-sm" />
                          <h6 class="text-weight-bold">Sastanci</h6>
                          <p class="meeting-schedule">
                            <strong>Ponedjeljak 19:00</strong> - Engleski jezik<br>
                            <strong>Utorak 19:00</strong> - Hrvatski jezik<br>
                            <strong>Četvrtak 19:00</strong> - Engleski jezik<br>
                            <strong>Petak 19:00</strong> - Hrvatski jezik<br>
                            <strong>Subota 19:00</strong> - Hrvatski i Engleski jezik<br>
                            <strong>Nedjelja 16:00</strong> - Hrvatski jezik
                          </p>
                        </div>

                        <div class="meeting-info-item">
                          <q-icon name="phone" size="50px" color="primary" class="q-mb-sm" />
                          <h6 class="text-weight-bold">Telefon</h6>
                          <p>
                            <a href="tel:+385919558993" class="text-primary text-h6">+385 91 955 89 93</a>
                          </p>
                        </div>
                      </div>

                      <!-- Map -->
                      <div class="col-12 col-md-6">
                        <div class="google-map">
                          <iframe
                            frameborder="0"
                            style="border:0; height:100%; width:100%; min-height:400px;"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.199708794448!2d15.926057876620408!3d45.78722661182746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d6a8cab7f85b%3A0xff627c73c1e1b7f9!2sCrkva%20sv.%20Mati%20Slobode!5e0!3m2!1shr!2shr!4v1738098238082!5m2!1shr!2shr"
                            allowfullscreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <!-- Poreč -->
              <q-expansion-item
                v-model="liveMeetings.porec"
                icon="place"
                label="Poreč"
                header-class="text-weight-bold text-h6"
              >
                <q-card>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-6">
                        <h6 class="text-h6 text-weight-bold q-mb-md">
                          Eufrazijeva ul. 22<br>
                          52440 Poreč
                        </h6>

                        <div class="meeting-info-item q-mb-md">
                          <q-icon name="email" size="50px" color="primary" class="q-mb-sm" />
                          <h6 class="text-weight-bold">Email</h6>
                          <p>
                            <a href="mailto:tukamiami@hotmail.com" class="text-primary text-h6">tukamiami@hotmail.com</a>
                          </p>
                        </div>

                        <div class="meeting-info-item">
                          <q-icon name="phone" size="50px" color="primary" class="q-mb-sm" />
                          <h6 class="text-weight-bold">Telefon</h6>
                          <p>
                            <a href="tel:+385916136885" class="text-primary text-h6">+385 91 613 68 85</a>
                          </p>
                        </div>
                      </div>

                      <div class="col-12 col-md-6">
                        <div class="google-map">
                          <iframe
                            frameborder="0"
                            style="border:0; height:100%; width:100%; min-height:400px;"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2809.9455188940296!2d13.59064527659655!3d45.22866974912251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477c97769c96e475%3A0xb90679a404b53e5!2sEufrazijeva%20ul.%2022%2C%2052440%2C%20Pore%C4%8D!5e0!3m2!1shr!2shr!4v1738096637111!5m2!1shr!2shr"
                            allowfullscreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <!-- Aljmaš -->
              <q-expansion-item
                v-model="liveMeetings.aljmas"
                icon="place"
                label="Aljmaš"
                header-class="text-weight-bold text-h6"
              >
                <q-card>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-6">
                        <h6 class="text-h6 text-weight-bold q-mb-md">
                          Dom Zdravlja Aljmaš<br>
                          Zlatna ul. 6, 31205 Aljmaš
                        </h6>

                        <div class="meeting-info-item q-mb-md">
                          <q-icon name="email" size="50px" color="primary" class="q-mb-sm" />
                          <h6 class="text-weight-bold">Email</h6>
                          <p>
                            <a href="mailto:aaivica@gmail.com" class="text-primary text-h6">aaivica@gmail.com</a>
                          </p>
                        </div>

                        <div class="meeting-info-item">
                          <q-icon name="phone" size="50px" color="primary" class="q-mb-sm" />
                          <h6 class="text-weight-bold">Telefon</h6>
                          <p>
                            <a href="tel:+385989545257" class="text-primary text-h6">+385 98 954 52 57</a>
                          </p>
                        </div>
                      </div>

                      <div class="col-12 col-md-6">
                        <div class="google-map">
                          <iframe
                            frameborder="0"
                            style="border:0; height:100%; width:100%; min-height:400px;"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.0798003221144!2d18.94559867677838!3d45.52859967107517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475c9545f48b51e1%3A0x24c5b72a6a3e206e!2sZlatna%20ul.%206%2C%2031205%2C%20Aljma%C5%A1!5e0!3m2!1shr!2shr!4v1738096468438!5m2!1shr!2shr"
                            allowfullscreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <!-- Zaprešić -->
              <q-expansion-item
                v-model="liveMeetings.zapresic"
                icon="place"
                label="Zaprešić"
                header-class="text-weight-bold text-h6"
              >
                <q-card>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-6">
                        <h6 class="text-h6 text-weight-bold q-mb-md">
                          Crkva Marija Kraljica Apostola<br>
                          Trg Dr. Franje Tuđmana 10, 10290, Zaprešić
                        </h6>

                        <div class="meeting-info-item q-mb-md">
                          <q-icon name="groups" size="50px" color="deep-orange-5" class="q-mb-sm" />
                          <h6 class="text-weight-bold">Sastanci</h6>
                          <p class="meeting-schedule">
                            <strong>Ponedjeljak 18:30</strong> - Hrvatski jezik<br>
                            <strong>Srijeda 18:30</strong> - Hrvatski jezik
                          </p>
                        </div>

                        <div class="meeting-info-item">
                          <q-icon name="phone" size="50px" color="primary" class="q-mb-sm" />
                          <h6 class="text-weight-bold">Telefon</h6>
                          <p>
                            <a href="tel:+385912805973" class="text-primary text-h6">+385 91 280 59 73</a>
                          </p>
                        </div>
                      </div>

                      <div class="col-12 col-md-6">
                        <div class="google-map">
                          <iframe
                            frameborder="0"
                            style="border:0; height:100%; width:100%; min-height:400px;"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.998821917049!2d15.793410976623901!3d45.8703268062492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765cf7a1a0706fd%3A0xa2e4f71e20f74550!2sCrkva%20Marija%20Kraljica%20Apostola!5e0!3m2!1shr!2shr!4v1759839413708!5m2!1shr!2shr"
                            allowfullscreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <!-- Split -->
              <q-expansion-item
                v-model="liveMeetings.split"
                icon="place"
                label="Split"
                header-class="text-weight-bold text-h6"
              >
                <q-card>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-6">
                        <h6 class="text-h6 text-weight-bold q-mb-md">
                          Grupa <strong>The Promises</strong><br><br>
                          Šetalište Bačvice 10<br>
                          21000 Split
                        </h6>

                        <div class="meeting-info-item q-mb-md">
                          <q-icon name="groups" size="50px" color="deep-orange-5" class="q-mb-sm" />
                          <h6 class="text-weight-bold">Sastanci</h6>
                          <p class="meeting-schedule">
                            <strong>Utorak 20:30</strong><br>
                            <strong>Četvrtak 20:30</strong><br>
                            <strong>Subota 19:00</strong><br>
                            <strong>Nedjelja 19:00</strong>
                          </p>
                        </div>

                        <div class="meeting-info-item q-mb-md">
                          <q-icon name="email" size="50px" color="primary" class="q-mb-sm" />
                          <h6 class="text-weight-bold">Email</h6>
                          <p>
                            <a href="mailto:mirelaj1@yahoo.com" class="text-primary text-h6">mirelaj1@yahoo.com</a>
                          </p>
                        </div>

                        <div class="meeting-info-item">
                          <q-icon name="phone" size="50px" color="primary" class="q-mb-sm" />
                          <h6 class="text-weight-bold">Telefon</h6>
                          <p>
                            <a href="tel:+385917971272" class="text-primary text-h6">+385 91 797 12 72</a> (Mia)
                          </p>
                        </div>
                      </div>

                      <div class="col-12 col-md-6">
                        <div class="google-map">
                          <iframe
                            frameborder="0"
                            style="border:0; height:100%; width:100%; min-height:400px;"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.9158418747884!2d16.44425227652456!3d43.50409116206152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133560a9f95e8b45%3A0xc6e63f593cf1ed84!2zxaBldGFsacWhdGUgQmHEjXZpY2UgMTAsIDIxMDAwLCBTcGxpdA!5e0!3m2!1shr!2shr!4v1759839508421!5m2!1shr!2shr"
                            allowfullscreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { usePageNavigation } from 'src/composables/usePageNavigation';

// Page navigation
const { handleSwipe } = usePageNavigation();

// Swiper modules
const swiperModules = [Autoplay, Pagination, Keyboard];

// Swiper refs and progress circles
const swiperRef = ref(null);
const progressCircle = ref<SVGSVGElement | null>(null);
const grupeSwiperRef = ref(null);
const grupeProgressCircle = ref<SVGSVGElement | null>(null);
const grupeProgressContent = ref<HTMLSpanElement | null>(null);

// Autoplay progress handler for shortcuts
const onAutoplayTimeLeft = (_swiper: unknown, _time: number, progress: number) => {
  if (progressCircle.value) {
    progressCircle.value.style.setProperty('--progress', String(1 - progress));
  }
};

// Autoplay progress handler for grupe
const onGrupeAutoplayTimeLeft = (_swiper: unknown, _time: number, progress: number) => {
  if (grupeProgressCircle.value) {
    grupeProgressCircle.value.style.setProperty('--progress', String(1 - progress));
  }
};

// Live meetings expansion state
const liveMeetings = ref({
  zagreb: false,
  porec: false,
  aljmas: false,
  zapresic: false,
  split: false,
});

const videoPlayer = ref<HTMLVideoElement | null>(null);

const resetVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.currentTime = 0;
  }
};

const shortcutCards = [
  {
    slideClass: 'slide-1',
    bgClass: 'bg-1',
    imageClass: 'ci-1',
    text: 'A.A. literatura predstavlja izvor inspiracije za oporavak alkoholičara.',
    buttonLabel: 'Literatura',
    link: '/literatura',
  },
  {
    slideClass: 'slide-6',
    bgClass: 'bg-6',
    imageClass: 'ci-6',
    text: 'Dnevna razmatranja su sinteza literature i živog iskustva A.A. - svakog dana u godini...',
    buttonLabel: 'Dnevna Razmatranja',
    link: '/literatura#Dnevna-Razmatranja',
  },
  {
    slideClass: 'slide-2',
    bgClass: 'bg-2',
    imageClass: 'ci-2',
    text: 'Jučer ne možemo promijeniti a sutra nam još ne pripada. Trijezni smo "samo danas".',
    buttonLabel: 'Kalkulator trijeznosti',
    link: '/o-nama#calculator-button',
  },
  {
    slideClass: 'slide-4',
    bgClass: 'bg-4',
    imageClass: 'ci-4',
    text: 'A.A. su g.1935 utemeljila dva alkoholičara - Bill Wilson iz New Yorka i Dr. Bob Smith iz Ohia.',
    buttonLabel: 'Povijest AA',
    link: '/informacije#osnivanje-naslov',
  },
  {
    slideClass: 'slide-5',
    bgClass: 'bg-5',
    imageClass: 'ci-5',
    text: 'Anonimnost kao duhovni temelj A.A. pruža zaštitu članovima od socialnog stigmatiziranja.',
    buttonLabel: 'Anonimnost u AA',
    link: '/informacije#anonimnost-naslov',
  },
  {
    slideClass: 'slide-7',
    bgClass: 'bg-7',
    imageClass: 'ci-7',
    text: 'Česta pitanja u vezi Anonimnih Alkoholičara i odgovori na ta pitanja.',
    buttonLabel: 'Pitanja i odgovori',
    link: '/informacije#pitanja-i-odgovori',
  },
];

const grupeCards = [
  {
    title: 'Beograd',
    note: 'Navečer',
    schedule: 'Svaki dan: 20:00<br>Subota: 20:00 (Novodošli)',
    link: 'https://us04web.zoom.us/j/415149688',
  },
  {
    title: 'Beograd',
    note: 'Ujutro',
    schedule: 'Ponedjeljak: 10:00<br>Srijeda: 10:00<br>Subota: 10:15',
    link: 'https://us02web.zoom.us/j/81250567176',
  },
  {
    title: 'Sarajevo',
    note: '',
    schedule: 'Srijeda: 18:45<br>Petak: 10:00',
    link: 'https://us04web.zoom.us/j/84990206475',
  },
  {
    title: 'Subotica',
    note: '',
    schedule: 'Četvrtak: 17:00',
    link: 'https://us02web.zoom.us/j/9533651427?pwd=eEJaRTBIS0llTjRLd2czSFFzVkZFQT09',
  },
];
</script>

<style scoped lang="scss">
.index-page {
  padding: 0;
  overflow-x: hidden; // Prevent horizontal scrollbar

  /* Hero Section Styles */
  /* Problem Section Styles */
  .content-section {
    padding: 5rem 0;

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .video-player {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-width: 100%;
      height: auto;
    }

    h2 {
      color: #333;
      margin-bottom: 1.5rem;
      line-height: 1.3;
    }

    p {
      color: #555;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .q-btn {
      font-size: 1.1rem;
      padding: 0.8rem 2rem;
      border-radius: 30px;
      text-transform: none;
      font-weight: 500;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      }
    }
  }

  /* Hero Section */
  .hero-section {
    position: relative;
    height: 600px; /* Fixed height */
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    color: white;
    text-align: center;
    padding: 2rem 1rem;

    .mbr-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: 0.5;
      background-color: var(--color-primary);
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;

      h1 {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

        @media (max-width: 768px) {
          font-size: 2.5rem;
        }
      }

      .text-h4 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

        @media (max-width: 768px) {
          font-size: 1.5rem;
        }
      }

      .text-italic {
        font-style: italic;
        font-size: 1.5rem;
        margin-bottom: 3rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

        @media (max-width: 768px) {
          font-size: 1.25rem;
        }
      }

      .q-btn {
        font-size: 1.2rem;
        padding: 0.8rem 2rem;
        border-radius: 30px;
        text-transform: none;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}

.hero-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  padding: var(--spacing-2xl);
  text-align: center;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  h1 {
    font-size: var(--font-size-4xl);
    margin: 0 0 var(--spacing-md) 0;
  }

  p {
    font-size: var(--font-size-lg);
    margin: 0 0 var(--spacing-lg) 0;
    opacity: 0.9;
  }
}

.content-section {
  padding: var(--spacing-2xl) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-lg);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.text-content {
  p {
    margin-bottom: var(--spacing-md);
    line-height: 1.6;
  }
}

.video-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
}

.video-player {
  width: 100%;
  max-width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-lg);
  background-color: #000;
}

.carousel-section {
  padding: 0 0; // Remove horizontal padding for full width
  background-color: var(--bg-secondary);

  .section-container {
    max-width: 100%;
    padding: 0; // Remove padding
  }

  h2 {
    text-align: center;
    margin-bottom: var(--spacing-xl);
    padding: 0 var(--spacing-lg); // Add padding only to heading
  }
}

// Swiper wrapper with autoplay progress
.shortcuts-swiper-wrapper {
  position: relative;
  width: 100%; // Use 100% instead of 100vw to avoid scrollbar issues
  max-width: 100vw; // Ensure it doesn't exceed viewport
  margin-left: 0; // Remove the centering calculation
  left: 50%; // Center using transform
  transform: translateX(-50%); // Center using transform
}

// Swiper styles - matching old site design
.shortcuts-swiper {
  height: 450px;
  width: 100%;
  padding-bottom: 50px;

  :deep(.swiper-slide) {
    position: relative;
    background: var(--color-surface-alternate);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  // Override card-image top position to push content down
  :deep(.card-image) {
    top: 30px !important; // Increased from 20px to push content down
  }

  // Adjust card-text-div bottom position accordingly
  :deep(.card-text-div) {
    padding-bottom: 0px;
    bottom: 90px !important; // Adjusted to maintain spacing
  }

  // Adjust card-button bottom position accordingly
  :deep(.card-button) {
    bottom: 25px !important; // Adjusted to maintain spacing
  }

  :deep(.swiper-pagination) {
    bottom: 10px;
  }

  :deep(.swiper-pagination-bullet) {
    margin-left: 8px;
    margin-right: 8px;
    width: 20px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.3);
  }

  :deep(.swiper-pagination-bullet-active) {
    background-color: #146C94;
  }
}

// Autoplay progress indicator (circular timer)
.autoplay-progress {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #1B475B;
  opacity: 0.3;

  svg {
    --progress: 0;
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    stroke-width: 4px;
    stroke: #1B475B;
    opacity: 0.4;
    fill: none;
    stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
    stroke-dasharray: 125.6;
    transform: rotate(-90deg);
  }
}

// Grupe Swiper Section
.grupe-swiper-section {
  padding: 0 0;
  background-color: var(--color-surface-alternate);
}

.grupe-swiper-wrapper {
  position: relative;
  width: 100%; // Use 100% instead of 100vw to avoid scrollbar issues
  max-width: 100vw; // Ensure it doesn't exceed viewport
  margin-left: 0; // Remove the centering calculation
  left: 50%; // Center using transform
  transform: translateX(-50%); // Center using transform
  background-color: var(--color-surface-alternate);
}

.grupe-swiper {
  height: 450px;
  width: 100%;
  padding-bottom: 50px;

  :deep(.swiper-slide) {
    position: relative;
    background: var(--color-surface-alternate);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  // Override card-image top position to push content down
  :deep(.card-image) {
    top: 30px !important; // Increased from 20px to push content down
  }

  // Adjust card-text-div bottom position accordingly
  :deep(.card-text-div) {
    padding-bottom: 10px;
    bottom: 90px !important; // Adjusted to maintain spacing
  }

  // Adjust card-button bottom position accordingly
  :deep(.card-button) {
    bottom: 25px !important; // Adjusted to maintain spacing
  }

  :deep(.swiper-pagination) {
    bottom: 10px;
  }

  :deep(.swiper-pagination-bullet) {
    margin-left: 8px;
    margin-right: 8px;
    width: 20px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.3);
  }

  :deep(.swiper-pagination-bullet-active) {
    background-color: #146C94;
  }
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.contact-item {
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-5px);
}

.contact-item .q-btn {
  width: 60px;
  height: 60px;
  font-size: 24px;
}

.contact-item h4 {
  margin: 1rem 0 0.5rem;
  color: #333;
}

.contact-item a {
  color: var(--q-primary);
  text-decoration: none;
  font-weight: 500;
  word-break: break-word;
}

.contact-item a:hover {
  text-decoration: underline;
}

/* Existing styles */
h2 {
  font-size: var(--font-size-2xl);
  margin: 0 0 var(--spacing-md) 0;
}

.kontakt {
  font-size: var(--font-size-4xl);
  color: var(--q-primary);
}

.sastanci {
  font-size: var(--font-size-4xl);
  color: var(--q-primary);
}

.grupa-naslov{
  font-family: "Roboto Condensed", sans-serif;
  font-size: 80%;
  line-height: 1.2;
}
.note{
  font-family: "Roboto Condensed", sans-serif;
}

// Live Meetings Section
.live-meetings-expandable {
  :deep(.q-item) {
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-md);
    background-color: white;
  }

  :deep(.q-expansion-item__container) {
    border-radius: var(--radius-md);
  }

  // Add spacing to the bottom of q-card inside q-expansion-item
  :deep(.q-expansion-item .q-card) {
    margin-bottom: 15px;
  }

  .meeting-info-item {
    text-align: center;

    h6 {
      margin-top: var(--spacing-sm);
      margin-bottom: var(--spacing-xs);
    }

    p {
      margin: 0;
    }
  }

  .meeting-schedule {
    text-align: left;
    line-height: 1.8;
  }

  .google-map {
    width: 100%;
    height: 100%;
    min-height: 400px;
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
}

/* Sastanci section layout: image on top on mobile, on right on desktop/tablet */
@media (max-width: 767px) {
  .sastanci-image {
    order: 1;
  }
  .sastanci-text {
    order: 2;
  }
}

@media (max-width: 768px) {
  .header-title {
    line-height: 1.2;
  }
}
</style>
