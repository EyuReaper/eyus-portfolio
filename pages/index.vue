<template>
    <div
        class="relative isolate min-h-screen bg-slate-950 text-sky-500 dark:bg-gray-950 dark:text-gray-100"
    >
        <nav
            class="sticky top-0 z-[60] flex items-center justify-between px-4 md:px-8 py-3 border-b border-emerald-500/20 bg-slate-950/95 font-mono"
        >
            <div class="flex items-center gap-6">
                <div class="flex items-center gap-2 group cursor-crosshair">
                    <!-- 翔 primary mark -->
                    <div
                        class="relative flex items-center justify-center w-8 h-8 overflow-hidden border border-emerald-500"
                    >
                        <div
                            class="absolute inset-0 transition-colors bg-emerald-500/10 group-hover:bg-emerald-500/30"
                        ></div>
                        <span
                            class="text-sm font-bold tracking-tighter text-emerald-500"
                            >翔</span
                        >
                    </div>
                    <div class="flex flex-col">
                        <span
                            class="text-[10px] tracking-widest text-emerald-500 uppercase font-bold leading-none"
                            >Eyu_Reaper.os</span
                        >
                        <span
                            class="text-[8px] text-slate-500 leading-none mt-1"
                            >v2.0.26_STABLE</span
                        >
                    </div>
                </div>

                <div
                    class="hidden xl:flex items-center gap-6 text-[10px] uppercase tracking-tighter border-l border-slate-800 pl-6"
                >
                    <div class="flex items-center gap-2 text-emerald-400">
                        <span class="relative flex w-2 h-2">
                            <span
                                class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400"
                            ></span>
                            <span
                                class="relative inline-flex w-2 h-2 rounded-full bg-emerald-500"
                            ></span>
                        </span>
                        Status: Nominal
                    </div>
                    <div class="text-slate-400">
                        Altitude:
                        <span class="text-white">{{ scrollAltitude }}ft</span>
                    </div>
                    <div class="text-slate-400">
                        Heading:
                        <span class="text-white">{{ currentHeading }}°N</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <div
                        class="flex items-center gap-4 px-3 py-1.5 bg-slate-900/80 border border-emerald-500/20 rounded-sm text-[11px]"
                    >
                        <a
                            :href="`https://github.com/${githubUser}`"
                            target="_blank"
                            class="flex items-center gap-1.5 hover:text-white transition-all group"
                        >
                            <font-awesome-icon
                                :icon="['fab', 'github']"
                                class="text-emerald-500 group-hover:scale-110"
                            />
                            <span class="hidden sm:inline font-bold text-slate-500">REPOS:</span>
                            <span class="font-mono text-emerald-400">{{
                                ghStats.repos
                            }}</span>
                        </a>
                        <div class="w-[1px] h-3 bg-slate-800"></div>
                        <div class="flex items-center gap-1.5">
                            <font-awesome-icon
                                :icon="['fas', 'star']"
                                class="text-orange-500"
                            />
                            <span class="hidden sm:inline font-bold text-slate-500">STARS:</span>
                            <span class="font-mono text-emerald-400">{{
                                ghStats.stars
                            }}</span>
                        </div>
                    </div>
                    <!-- Theme toggles for phones (the side rail is hidden there) -->
                    <button
                        type="button"
                        class="sm:hidden grid place-items-center w-9 h-9 rounded-md border border-slate-500/30 text-slate-400 transition-colors"
                        :aria-pressed="isLightMode"
                        :aria-label="isLightMode ? 'Switch to night vision' : 'Switch to light mode'"
                        @click="isLightMode ? toggleDarkMode() : toggleLightMode()"
                    >
                        <svg v-if="isLightMode" viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10.5h16v5.2a2.3 2.3 0 0 1-2.3 2.3h-2.4a2 2 0 0 1-1.8-1.1l-.6-1.2a1 1 0 0 0-1.8 0l-.6 1.2A2 2 0 0 1 8.7 18H6.3A2.3 2.3 0 0 1 4 15.7z"/><circle cx="8.3" cy="14" r="1.6"/><circle cx="15.7" cy="14" r="1.6"/><path d="M7 10.5 8.5 6h7l1.5 4.5M12 6V4"/></svg>
                        <svg v-else viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>
                    </button>
                    <!-- Separate NVG toggle; hidden in light mode, where the toggle above shows goggles -->
                    <button
                        v-if="!isLightMode"
                        type="button"
                        class="sm:hidden grid place-items-center w-9 h-9 rounded-md border transition-colors"
                        :class="isDarkMode ? 'text-green-400 border-green-400/50 bg-green-500/10' : 'text-slate-400 border-slate-500/30'"
                        :aria-pressed="isDarkMode"
                        aria-label="Toggle night vision"
                        @click="toggleDarkMode"
                    >
                        <svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M4 10.5h16v5.2a2.3 2.3 0 0 1-2.3 2.3h-2.4a2 2 0 0 1-1.8-1.1l-.6-1.2a1 1 0 0 0-1.8 0l-.6 1.2A2 2 0 0 1 8.7 18H6.3A2.3 2.3 0 0 1 4 15.7z"/>
                            <circle cx="8.3" cy="14" r="1.6" :fill="isDarkMode ? 'currentColor' : 'none'"/>
                            <circle cx="15.7" cy="14" r="1.6" :fill="isDarkMode ? 'currentColor' : 'none'"/>
                            <path d="M7 10.5 8.5 6h7l1.5 4.5M12 6V4"/>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
        <FlightTerrainBg />

        <!-- SCAN (Home) Section -->
        <section
            id="scan"
            class="relative container z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-24 py-16 mx-auto text-center"
        >
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span class="text-[20vw] sm:text-[18vw] font-bold text-emerald-500/[0.04] dark:text-emerald-500/[0.07] leading-none">翔</span>
            </div>
            <div class="relative z-10 max-w-4xl animate-fade-in">
                <img
                    :src="profileImg"
                    alt="Eyu's Profile Picture"
                    class="object-cover w-48 h-48 mx-auto mb-6 border-4 rounded-full shadow-lg border-emerald-500"
                />
                <h1
                    class="mb-4 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white animate-fly-in"
                >
                    Eyu's Portfolio
                </h1>
                <p class="mb-8 text-3xl italic font-semibold text-emerald-500">
                    Aviator of Code. Cleared for your next build.
                </p>
                <p
                    class="max-w-2xl mx-auto mb-10 text-xl leading-relaxed text-white"
                >
                    Welcome aboard. I'm Eyu, a full-stack developer with a
                    front-end focus. I build fast, reliable web apps in Next.js
                    and Vue, and I like turning messy problems into tools people
                    actually enjoy using.
                </p>
                <AirDropButton />
                <div
                    id="typewriter-container"
                    class="p-4 mt-4 font-mono text-sm text-left border rounded-lg bg-slate-950/80 border-emerald-500/30 terminal-container"
                >
                    <span class="text-emerald-500/50">$</span>
                    <span class="text-emerald-500 typewriter-text"></span>
                    <span class="cursor">▊</span>
                </div>
                <!-- Availability, set in utils/availability.js -->
                <div
                    class="status-chip"
                    :class="isOpenToWork ? 'status-chip--open' : 'status-chip--mission'"
                    role="status"
                >
                    <span class="status-dot" aria-hidden="true"></span>
                    <span class="status-key">STATUS //</span>
                    <strong class="status-value">{{ isOpenToWork ? "OPEN TO NEW MISSIONS" : "ON MISSION" }}</strong>
                    <span v-if="!isOpenToWork" class="status-note">Currently engaged, still happy to talk</span>
                    <a href="#comms" class="status-link" @click.prevent="goToComms">
                        Open a channel
                        <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </a>
                </div>
            </div>
        </section>

        <!-- INTEL (About) Section -->
        <section
            id="intel"
            ref="intelRef"
            :class="[
                'container',
                'flex-grow',
                'px-4',
                'sm:px-24',
                'py-16',
                'mx-auto',
                'text-white',
                'min-h-screen',
                'section-transition',
                { 'is-visible': intelVisible },
            ]"
        >
            <h2 class="mb-10 text-5xl font-bold text-center text-emerald-500">
                INTEL
            </h2>
            <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                <div class="md:order-2">
                    <img
                        :src="intelImg"
                        alt="Eyu standing with arms crossed"
                        class="object-cover w-full h-auto border-4 rounded-lg shadow-xl border-sky-500"
                    />
                </div>

                <div
                    class="space-y-6 font-mono text-lg leading-relaxed md:order-1"
                >
                    <h3 class="text-3xl text-emerald-500">The Pilot</h3>
                    <h4 class="text-2xl text-emerald-500">
                        Call sign:
                        <a href="https://t.me/EyuReaper"
                            ><span class="text-orange-500">EyuReaper</span></a
                        >
                    </h4>
                    <p>
                        Hi, I'm Eyuel, or Eyu for short. I like building
                        software that runs efficiently and makes a real
                        difference to the people using it. Hard problems are
                        the fun part for me, and I pick up new tools and
                        methods whenever a project calls for them. I want my
                        apps to be easy to use as well as working, and I'm
                        careful about the details.
                    </p>
                    <p>
                        Most of my frontend work is in React and Vue.js,
                        styled with Tailwind CSS because it's quick to write
                        and easy to maintain. I also work with Nuxt.js,
                        Node.js on the backend, MongoDB and PostgreSQL,
                        Supabase, and Vercel. I'm always happy to collaborate
                        on projects that need creative problem-solving.
                    </p>
                    <p>
                        Away from the keyboard, I read about technology and
                        history, draw and sketch, and solve puzzles. Those
                        hobbies keep my analytical thinking, my eye for design,
                        and my planning sharp, and all of that carries over
                        into my projects.
                    </p>
                </div>
            </div>
        </section>

        <TechAltitude />

        <!-- HANGAR (Projects) Section -->
        <section
            id="hangar"
            ref="hangarRef"
            :class="[
                'container',
                'flex-grow',
                'min-h-screen',
                'px-4',
                'sm:px-24',
                'py-16',
                'mx-auto',
                'text-white',
                'section-transition',
                { 'is-visible': hangarVisible },
            ]"
        >
            <h2 class="mb-12 text-5xl font-bold text-center text-emerald-500">
                HANGAR
            </h2>
            <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
                <div
                    class="p-6 transition-transform duration-300 transform border shadow-xl bg-slate-900 rounded-xl border-sky-500 hover:border-emerald-500 hover:scale-105 mission-dossier group"
                    tabindex="0"
                    role="button"
                    @click="
                        showImageModal('screenshot-landingpage-siraqemir.png')
                    "
                    @keydown.enter="
                        showImageModal('screenshot-landingpage-siraqemir.png')
                    "
                >
                    <div class="relative">
                        <img
                            :src="proxiedImage('screenshot-landingpage-siraqemir.png')"
                            alt="Sira Qemir landing page"
                            class="object-cover w-full mb-4 rounded-lg cursor-pointer h-38"
                            @click="
                                showImageModal('screenshot-landingpage-siraqemir.png')
                            "
                        />
                        <div
                            class="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 bg-black bg-opacity-75 rounded-lg opacity-0 group-hover:opacity-100"
                        >
                            <h4 class="text-xl font-bold text-emerald-500">
                                Technical Specs
                            </h4>
                            <div class="flex flex-wrap gap-2 mt-2 text-sm">
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >React</span
                                >
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >Tailwind CSS</span
                                >
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >PostgreSQL</span
                                >
                            </div>
                        </div>
                    </div>
                    <h3 class="mb-3 text-2xl sm:text-3xl font-semibold text-white">
                     Sira-qemir
                    </h3>
                    <p class="mb-4 text-white text-md">
                        Sira Qemir (ሥራ ቀምር) is a task management web app
                        built with React, Supabase, and Tailwind CSS, designed
                        for Ethiopian users first.
                    </p>
                    <div class="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-6">
                        <a
                            href="https://github.com/EyuReaper/sira-qemir"
                            target="_blank"
                            class="military-cut-button inline-flex items-center gap-2 px-5 py-[11px] text-xs font-bold text-white tracking-[0.1em] transition-all duration-200 bg-sky-500 hover:bg-sky-400 hover:scale-105"
                        >
                                <font-awesome-icon :icon="['fab', 'github']" />
                                <span>GitHub</span>
                        </a>
                        <a
                            href="https://sira-qemir-flrv.vercel.app"
                            target="_blank"
                            class="military-cut-button inline-flex items-center gap-2 px-5 py-[11px] text-xs font-bold text-slate-950 tracking-[0.1em] transition-all duration-200 bg-emerald-500 hover:bg-emerald-400 hover:scale-105"
                        >
                                <font-awesome-icon :icon="['fas', 'rocket']" />
                                <span>Live Demo</span>
                        </a>
                    </div>
                </div>

                <!-- Project Card 2 -->
                <div
                    class="p-6 transition-transform duration-300 transform border shadow-xl bg-slate-900 rounded-xl border-sky-500 hover:border-emerald-500 hover:scale-105 mission-dossier group"
                    tabindex="0"
                    role="button"
                    @click="
                        showImageModal('screencapture-luxurywatch-በአማርኛ.png')
                    "
                    @keydown.enter="
                        showImageModal('screencapture-luxurywatch-በአማርኛ.png')
                    "
                >
                    <div class="relative">
                        <img
                            :src="proxiedImage('screencapture-luxurywatch-በአማርኛ.png')"
                            alt="Luxury watch product landing page"
                            class="object-cover w-full h-48 mb-4 rounded-lg cursor-pointer"
                            @click="
                                showImageModal('screencapture-luxurywatch-በአማርኛ.png')
                            "
                        />
                        <div
                            class="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 bg-black bg-opacity-75 rounded-lg opacity-0 group-hover:opacity-100"
                        >
                            <h4 class="text-xl font-bold text-emerald-500">
                                Technical Specs
                            </h4>
                            <div class="flex flex-wrap gap-2 mt-2 text-sm">
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >Javascript</span
                                >
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >Html</span
                                >
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >CSS</span
                                >
                            </div>
                        </div>
                    </div>
                    <h3 class="mb-3 text-3xl font-semibold text-white">
                         Luxury Watch Product Landing Page
                    </h3>
                    <p class="mb-4 text-white text-md">
                        A product landing page for luxury watches, with
                        parallax scrolling and interactive elements.
                    </p>
                    <div class="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-6">
                        <a
                            href="https://github.com/EyuReaper/luxury-watch-landing-page"
                            target="_blank"
                            class="military-cut-button inline-flex items-center gap-2 px-5 py-[11px] text-xs font-bold text-white tracking-[0.1em] transition-all duration-200 bg-sky-500 hover:bg-sky-400 hover:scale-105"
                        >
                                <font-awesome-icon :icon="['fab', 'github']" />
                                <span>GitHub</span>
                        </a>
                    </div>
                </div>

                <!-- Project Card 3 -->
                <div
                    class="p-6 transition-transform duration-300 transform border shadow-xl bg-slate-900 rounded-xl border-sky-500 hover:border-emerald-500 hover:scale-105 mission-dossier group"
                    tabindex="0"
                    role="button"
                    @click="
                        showImageModal('screencapture-amharic-phrase-book.png')
                    "
                    @keydown.enter="
                        showImageModal('screencapture-amharic-phrase-book.png')
                    "
                >
                    <div class="relative">
                        <img
                            :src="proxiedImage('screencapture-amharic-phrase-book.png')"
                            alt="Amharic phrasebook web app"
                            class="object-cover w-full h-48 mb-4 rounded-lg cursor-pointer"
                            @click="
                                showImageModal('screenshot-amharic-phrasebook-webapp.png')
                            "
                        />
                        <div
                            class="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 bg-black bg-opacity-75 rounded-lg opacity-0 group-hover:opacity-100"
                        >
                            <h4 class="text-xl font-bold text-emerald-500">
                                Technical Specs
                            </h4>
                            <div class="flex flex-wrap gap-2 mt-2 text-sm">
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >React</span
                                >
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >Typescript</span
                                >
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >Tailwind CSS</span
                                >
                            </div>
                        </div>
                    </div>
                    <h3 class="mb-3 text-3xl font-semibold text-white">
                        Amharic Phrase book
                    </h3>
                    <p class="mb-4 text-white text-md">
                        A free, offline-friendly Amharic phrasebook web app for
                        travelers and learners.
                    </p>
                    <div class="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-6">
                        <a
                            href="https://github.com/EyuReaper/amharic-phrase-book"
                            target="_blank"
                            class="military-cut-button inline-flex items-center gap-2 px-5 py-[11px] text-xs font-bold text-white tracking-[0.1em] transition-all duration-200 bg-sky-500 hover:bg-sky-400 hover:scale-105"
                        >
                                <font-awesome-icon :icon="['fab', 'github']" />
                                <span>GitHub</span>
                        </a>
                        <a
                            href="https://amharic-phrase-book.vercel.app/"
                            target="_blank"
                            class="military-cut-button inline-flex items-center gap-2 px-5 py-[11px] text-xs font-bold text-slate-950 tracking-[0.1em] transition-all duration-200 bg-emerald-500 hover:bg-emerald-400 hover:scale-105"
                        >
                                <font-awesome-icon :icon="['fas', 'rocket']" />
                                <span>Live Demo</span>
                        </a>
                    </div>
                </div>

                <!-- Project Card 4 -->
                <div
                    class="p-6 transition-transform duration-300 transform border shadow-xl bg-slate-900 rounded-xl border-sky-500 hover:border-emerald-500 hover:scale-105 mission-dossier group"
                    tabindex="0"
                    role="button"
                    @click="
                        showImageModal('screencapture-yckf-replica.png')
                    "
                    @keydown.enter="
                        showImageModal('screencapture-yckf-replica.png')
                    "
                >
                    <div class="relative">
                        <img
                            :src="proxiedImage('screencapture-yckf-replica.png')"
                            alt="YCKF replica home page"
                            class="object-cover w-full h-48 mb-4 rounded-lg cursor-pointer"
                            @click="
                                showImageModal('screencapture-yckf-replica.png')
                            "
                        />
                        <div
                            class="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 bg-black bg-opacity-75 rounded-lg opacity-0 group-hover:opacity-100"
                        >
                            <h4 class="text-xl font-bold text-emerald-500">
                                Technical Specs
                            </h4>
                            <div class="flex flex-wrap gap-2 mt-2 text-sm">
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >Next.js</span
                                >
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >Express+Typescript</span
                                >
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >Sanity CMS</span
                                >
                            </div>
                        </div>
                    </div>
                    <h3 class="mb-3 text-3xl font-semibold text-white">
                        YCKF-replica
                    </h3>
                    <p class="mb-4 text-white text-md">
                        A full-stack internship project for the Young Cyber
                        Knight Foundation.
                    </p>
                    <div class="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-6">
                        <a
                            href="https://github.com/EyuReaper/yckf-replica"
                            target="_blank"
                            class="military-cut-button inline-flex items-center gap-2 px-5 py-[11px] text-xs font-bold text-white tracking-[0.1em] transition-all duration-200 bg-sky-500 hover:bg-sky-400 hover:scale-105"
                        >
                                <font-awesome-icon :icon="['fab', 'github']" />
                                <span>GitHub</span>
                        </a>
                        <a
                            href="https://yckf-replica.vercel.app/"
                            target="_blank"
                            class="military-cut-button inline-flex items-center gap-2 px-5 py-[11px] text-xs font-bold text-slate-950 tracking-[0.1em] transition-all duration-200 bg-emerald-500 hover:bg-emerald-400 hover:scale-105"
                        >
                                <font-awesome-icon :icon="['fas', 'rocket']" />
                                <span>Live Demo</span>
                        </a>
                    </div>
                </div>

                <!-- Project Card 5 -->
                <div
                    class="p-6 transition-transform duration-300 transform border shadow-xl bg-slate-900 rounded-xl border-sky-500 hover:border-emerald-500 hover:scale-105 mission-dossier group"
                    tabindex="0"
                    role="button"
                    @click="
                        showImageModal('screencapture-janoweb1.png')
                    "
                    @keydown.enter="
                        showImageModal('screencapture-janoweb1.png')
                    "
                >
                    <div class="relative">
                        <img
                            :src="proxiedImage('screencapture-janoweb1.png')"
                            alt="Jano-fidel website"
                            class="object-cover w-full h-48 mb-4 rounded-lg cursor-pointer"
                            @click="
                                showImageModal('screencapture-janoweb1.png')
                            "
                        />
                        <div
                            class="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 bg-black bg-opacity-75 rounded-lg opacity-0 group-hover:opacity-100"
                        >
                            <h4 class="text-xl font-bold text-emerald-500">
                                Technical Specs
                            </h4>
                            <div class="flex flex-wrap gap-2 mt-2 text-sm">
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >Javascript</span
                                >
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >Node.js</span
                                >
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >Typescript</span
                                >
                            </div>
                        </div>
                    </div>
                    <h3 class="mb-3 text-3xl font-semibold text-white">
                        Jano-fidel
                    </h3>
                    <p class="mb-4 text-white text-md">
                        A programming language written in native Amharic,
                        built on Node.js.
                    </p>
                    <div class="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-6">
                        <a
                            href="https://github.com/EyuReaper/jano-fidel"
                            target="_blank"
                            class="military-cut-button inline-flex items-center gap-2 px-5 py-[11px] text-xs font-bold text-white tracking-[0.1em] transition-all duration-200 bg-sky-500 hover:bg-sky-400 hover:scale-105"
                        >
                                <font-awesome-icon :icon="['fab', 'github']" />
                                <span>GitHub</span>
                        </a>
                        <a
                            href="https://jano-fidel.vercel.app/"
                            target="_blank"
                            class="military-cut-button inline-flex items-center gap-2 px-5 py-[11px] text-xs font-bold text-slate-950 tracking-[0.1em] transition-all duration-200 bg-emerald-500 hover:bg-emerald-400 hover:scale-105"
                        >
                                <font-awesome-icon :icon="['fas', 'rocket']" />
                                <span>Live Demo</span>
                        </a>
                    </div>
                </div>

                <!-- Project Card 6 -->
                <div
                    class="p-6 transition-transform duration-300 transform border shadow-xl bg-slate-900 rounded-xl border-sky-500 hover:border-emerald-500 hover:scale-105 mission-dossier group"
                    tabindex="0"
                    role="button"
                    @click="
                        showImageModal('screencapture-fidel-ascii.png')
                    "
                    @keydown.enter="
                        showImageModal('screencapture-fidel-ascii.png')
                    "
                >
                    <div class="relative">
                        <img
                            :src="proxiedImage('screencapture-fidel-ascii.png')"
                            alt="Fidel-ascii running in a terminal"
                            class="object-cover w-full h-48 mb-4 rounded-lg cursor-pointer"
                            @click="
                                showImageModal('screencapture-fidel-ascii.png')
                            "
                        />
                        <div
                            class="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 bg-black bg-opacity-75 rounded-lg opacity-0 group-hover:opacity-100"
                        >
                            <h4 class="text-xl font-bold text-emerald-500">
                                Technical Specs
                            </h4>
                            <div class="flex flex-wrap gap-2 mt-2 text-sm">
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >TypeScript</span
                                >
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >JavaScript</span
                                >
                                <span
                                    class="px-3 py-1 rounded-full bg-sky-500 text-slate-950"
                                    >CSS</span
                                >
                            </div>
                        </div>
                    </div>
                    <h3 class="mb-3 text-3xl font-semibold text-white">
                        Fidel-ascii
                    </h3>
                    <p class="mb-4 text-white text-md">
                        An Ethiopian character map and rendering engine for
                        the terminal.
                    </p>
                    <div class="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-6">
                        <a
                            href="https://github.com/EyuReaper/fidel-ascii"
                            target="_blank"
                            class="military-cut-button inline-flex items-center gap-2 px-5 py-[11px] text-xs font-bold text-white tracking-[0.1em] transition-all duration-200 bg-sky-500 hover:bg-sky-400 hover:scale-105"
                        >
                                <font-awesome-icon :icon="['fab', 'github']" />
                                <span>GitHub</span>
                        </a>
                        <a
                            href="https://fidel-ascii.vercel.app"
                            target="_blank"
                            class="military-cut-button inline-flex items-center gap-2 px-5 py-[11px] text-xs font-bold text-slate-950 tracking-[0.1em] transition-all duration-200 bg-emerald-500 hover:bg-emerald-400 hover:scale-105"
                        >
                                <font-awesome-icon :icon="['fas', 'rocket']" />
                                <span>Live Demo</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- COMMS (Contact) Section -->
        <section
            id="comms"
            ref="commsRef"
            :class="[
                'container',
                'flex-grow',
                'px-4',
                'sm:px-24',
                'py-16',
                'mx-auto',
                'text-white',
                'min-h-screen',
                'section-transition',
                { 'is-visible': commsVisible },
            ]"
        >
            <h2 class="mb-12 text-5xl font-bold text-center text-emerald-500">
                COMMS
            </h2>
            <div
                class="flex flex-col items-center justify-center max-w-5xl gap-12 mx-auto"
            >
                <div
                    class="max-w-xl p-8 border shadow-xl bg-slate-900 rounded-xl border-sky-500"
                >
                    <p class="mb-8 text-lg text-center">
                        Ready to deploy a new mission? Reach out and let's
                        discuss how I can help.
                    </p>
                    <form @submit.prevent="submitForm" class="space-y-6">
                        <div>
                            <label
                                for="name"
                                class="block mb-2 text-sm font-semibold text-white"
                                >Name</label
                            >
                            <input
                                type="text"
                                id="name"
                                v-model="form.name"
                                required
                                :aria-invalid="!!errors.name"
                                :aria-describedby="
                                    errors.name ? 'name-error' : null
                                "
                                class="w-full p-3 text-white border rounded-lg bg-slate-950 border-sky-500 focus:outline-none focus:border-emerald-500"
                            />
                            <p
                                v-if="errors.name"
                                :id="'name-error'"
                                class="mt-1 text-sm text-red-500"
                                role="alert"
                            >
                                {{ errors.name }}
                            </p>
                        </div>
                        <div>
                            <label
                                for="email"
                                class="block mb-2 text-sm font-semibold text-white"
                                >Email</label
                            >
                            <input
                                type="email"
                                id="email"
                                v-model="form.email"
                                required
                                :aria-invalid="!!errors.email"
                                :aria-describedby="
                                    errors.email ? 'email-error' : null
                                "
                                class="w-full p-3 text-white border rounded-lg bg-slate-950 border-sky-500 focus:outline-none focus:border-emerald-500"
                            />
                            <p
                                v-if="errors.email"
                                :id="'email-error'"
                                class="mt-1 text-sm text-red-500"
                                role="alert"
                            >
                                {{ errors.email }}
                            </p>
                        </div>
                        <div>
                            <label
                                for="message"
                                class="block mb-2 text-sm font-semibold text-white"
                                >Message</label
                            >
                            <textarea
                                id="message"
                                v-model="form.message"
                                rows="6"
                                required
                                :aria-invalid="!!errors.message"
                                :aria-describedby="
                                    errors.message ? 'message-error' : null
                                "
                                class="w-full p-3 text-white border rounded-lg bg-slate-950 border-sky-500 focus:outline-none focus:border-emerald-500"
                            ></textarea>
                            <p
                                v-if="errors.message"
                                :id="'message-error'"
                                class="mt-1 text-sm text-red-500"
                                role="alert"
                            >
                                {{ errors.message }}
                            </p>
                        </div>
                        <!-- Honeypot field for spam prevention -->
                        <input
                            type="text"
                            v-model="form.honeypot"
                            autocomplete="off"
                            tabindex="-1"
                            style="display: none"
                            aria-hidden="true"
                        />
                        <button
                            type="submit"
                            :disabled="isSubmitting"
                            class="flex items-center justify-center w-full py-3 text-lg font-bold transition-all duration-300 transform rounded-full shadow-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:scale-105 signal-transmitter"
                        >
                            <span v-if="isSubmitting" class="flex items-center">
                                <span class="mr-2" aria-hidden="true">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="28"
                                        height="28"
                                        viewBox="0 0 100 100"
                                        overflow="visible"
                                        fill="#000"
                                        stroke="none"
                                        aria-hidden="true"
                                    >
                                        <defs>
                                            <rect
                                                id="loader"
                                                x="15"
                                                y="40"
                                                width="10"
                                                height="20"
                                                rx="2"
                                                ry="2"
                                            />
                                        </defs>
                                        <use
                                            xlink:href="#loader"
                                            transform="rotate(0 50 50)"
                                        >
                                            <animate
                                                attributeName="opacity"
                                                values="0;1;0"
                                                dur="1s"
                                                begin="0s"
                                                repeatCount="indefinite"
                                            />
                                        </use>
                                        <use
                                            xlink:href="#loader"
                                            transform="rotate(45 50 50)"
                                        >
                                            <animate
                                                attributeName="opacity"
                                                values="0;1;0"
                                                dur="1s"
                                                begin="0.125s"
                                                repeatCount="indefinite"
                                            />
                                        </use>
                                        <use
                                            xlink:href="#loader"
                                            transform="rotate(90 50 50)"
                                        >
                                            <animate
                                                attributeName="opacity"
                                                values="0;1;0"
                                                dur="1s"
                                                begin="0.25s"
                                                repeatCount="indefinite"
                                            />
                                        </use>
                                        <use
                                            xlink:href="#loader"
                                            transform="rotate(135 50 50)"
                                        >
                                            <animate
                                                attributeName="opacity"
                                                values="0;1;0"
                                                dur="1s"
                                                begin="0.375s"
                                                repeatCount="indefinite"
                                            />
                                        </use>
                                        <use
                                            xlink:href="#loader"
                                            transform="rotate(180 50 50)"
                                        >
                                            <animate
                                                attributeName="opacity"
                                                values="0;1;0"
                                                dur="1s"
                                                begin="0.5s"
                                                repeatCount="indefinite"
                                            />
                                        </use>
                                        <use
                                            xlink:href="#loader"
                                            transform="rotate(225 50 50)"
                                        >
                                            <animate
                                                attributeName="opacity"
                                                values="0;1;0"
                                                dur="1s"
                                                begin="0.625s"
                                                repeatCount="indefinite"
                                            />
                                        </use>
                                        <use
                                            xlink:href="#loader"
                                            transform="rotate(270 50 50)"
                                        >
                                            <animate
                                                attributeName="opacity"
                                                values="0;1;0"
                                                dur="1s"
                                                begin="0.75s"
                                                repeatCount="indefinite"
                                            />
                                        </use>
                                        <use
                                            xlink:href="#loader"
                                            transform="rotate(315 50 50)"
                                        >
                                            <animate
                                                attributeName="opacity"
                                                values="0;1;0"
                                                dur="1s"
                                                begin="0.875s"
                                                repeatCount="indefinite"
                                            />
                                        </use>
                                    </svg>
                                </span>
                                <span class="sr-only">Sending...</span>
                                Sending...
                            </span>
                            <span v-else
                                >Transmit Signal
                                <font-awesome-icon
                                    :icon="['fas', 'satellite-dish']"
                                    class="ml-2"
                                    aria-hidden="true"
                                /></span
                            >
                        </button>
                        <p class="mt-4 text-sm text-center text-emerald-500">
                            Track my signal! The radar below shows my current
                            social presence.
                        </p>
                    </form>
                    <!-- Feedback messages -->
                    <div
                        v-if="submitStatus"
                        class="relative max-w-xl mx-auto mt-4"
                    >
                        <div
                            v-if="submitStatus === 'success'"
                            class="flex items-center justify-between gap-4 px-4 py-3 text-sm text-emerald-100 bg-emerald-500/10 border border-emerald-400/40 rounded-md"
                            role="status"
                            aria-live="polite"
                        >
                            <span>Message sent successfully!</span>
                            <button
                                @click="submitStatus = null"
                                type="button"
                                aria-label="Dismiss message"
                                class="grid place-items-center w-7 h-7 rounded text-emerald-300 hover:bg-emerald-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                            >
                                <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
                            </button>
                        </div>
                        <div
                            v-else-if="submitStatus === 'error'"
                            class="flex items-center justify-between gap-4 px-4 py-3 text-sm text-red-100 bg-red-500/10 border border-red-400/40 rounded-md"
                            role="alert"
                            aria-live="assertive"
                        >
                            <span
                                >Failed to send message. Please try again.</span
                            >
                            <button
                                @click="submitStatus = null"
                                type="button"
                                aria-label="Dismiss message"
                                class="grid place-items-center w-7 h-7 rounded text-red-300 hover:bg-red-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
                            >
                                <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <SocialRadar :socialLinks="socialMediaLinks" />
            </div>
        </section>

        <!-- Image Modal -->
        <div
            v-if="isModalOpen"
            class="fixed inset-0 z-[10030] flex items-center justify-center p-4 bg-black/85"
            role="dialog"
            aria-modal="true"
            aria-label="Project screenshot"
            @click.self="closeImageModal"
        >
            <div
                class="relative max-w-4xl max-h-full overflow-auto rounded-lg shadow-xl"
            >
                <button
                    ref="modalCloseRef"
                    type="button"
                    @click="closeImageModal"
                    class="absolute z-10 grid place-items-center w-10 h-10 top-3 right-3 rounded-full text-slate-200 bg-slate-950/90 border border-emerald-500/30 transition-colors hover:text-emerald-300 hover:border-emerald-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                    aria-label="Close screenshot"
                >
                    <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
                </button>
                <img
                    :src="modalImageUrl"
                    alt="Enlarged project screenshot"
                    class="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
            </div>
        </div>

        <SideNav />
        <JetScroll />
    </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import FlightTerrainBg from "@/components/ui/FlightTerrainBg.vue";
import JetScroll from "@/components/jetscroll.vue";
import TechAltitude from "@/components/TechAltitude.vue";
import SocialRadar from "@/components/SocialRadar.vue"; // New import
import { useImageProxy } from "@/composables/useImageProxy";
import { useThemeStore } from "@/composables/useThemeStore";
import { normalizeAvailability } from "@/utils/availability";

// Set with NUXT_PUBLIC_AVAILABILITY ('open' | 'on-mission'); see utils/availability.js
const isOpenToWork =
    normalizeAvailability(useRuntimeConfig().public.availability) === "open";
const goToComms = () => {
    document.getElementById("comms")?.scrollIntoView({ behavior: "smooth" });
};

const { isDarkMode, toggleDarkMode, isLightMode, toggleLightMode } = useThemeStore();

const { proxiedImage } = useImageProxy();

const profileImg = proxiedImage("profile.jpg", { format: "webp", quality: 80 });
const intelImg = proxiedImage("image1.png", { format: "webp", quality: 80 });

// --- Section Visibility ---
const intelRef = ref(null);
const hangarRef = ref(null);
const commsRef = ref(null);

const socialMediaLinks = [
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/eyuel-getachew-37061513b",
    },
    { name: "GitHub", url: "https://github.com/EyuReaper" },
    { name: "Telegram", url: "https://t.me/EyuReaper" },
    { name: "X", url: "https://x.com/eyu_gx" },
];

const intelVisible = ref(false);
const hangarVisible = ref(false);
const commsVisible = ref(false);

// --- GitHub Intel Setup ---
const githubUser = "EyuReaper";
const scrollAltitude = ref(0);
const currentHeading = ref(0);

// Use useAsyncData for SSR-friendly data fetching, routed through our
// cached server endpoint so we don't burn GitHub's shared unauth rate limit.
const { data: githubData } = await useAsyncData("github-stats", async () => {
    try {
        return await $fetch("/api/github-stats", {
            query: { username: githubUser },
        });
    } catch (e) {
        console.error("Error fetching GitHub stats:", e);
        return { repos: "ERR", stars: "ERR" };
    }
});

const ghStats = computed(
    () => githubData.value || { repos: "...", stars: "..." },
);

const handleScrollData = () => {
    // Simulate altitude based on scroll height
    scrollAltitude.value = Math.floor(window.scrollY * 0.8);
    // Change heading based on scroll percentage
    const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
    currentHeading.value = Math.floor(scrollPercent * 360);
};

useIntersectionObserver(intelRef, ([{ isIntersecting }]) => {
    if (isIntersecting) intelVisible.value = true;
});
useIntersectionObserver(hangarRef, ([{ isIntersecting }]) => {
    if (isIntersecting) hangarVisible.value = true;
});
useIntersectionObserver(commsRef, ([{ isIntersecting }]) => {
    if (isIntersecting) commsVisible.value = true;
});

let scrollFrame = null;
const onScroll = () => {
    if (scrollFrame !== null) return;
    scrollFrame = requestAnimationFrame(() => {
        scrollFrame = null;
        handleScrollData();
    });
};

// --- Typewriter and Flicker ---
let typewriterTimer = null;

onMounted(() => {
    window.addEventListener("scroll", onScroll, { passive: true });

    const container = document.getElementById("typewriter-container");
    if (container) {
        const textSpan = container.querySelector(".typewriter-text");
        const cursor = container.querySelector(".cursor");
        const text =
            "Preflight complete. Portfolio cleared for recruiter review. Standing by for contact.";
        let index = 0;

        cursor.style.opacity = "0";

        function type() {
            if (index < text.length) {
                textSpan.textContent += text.charAt(index);
                index++;
                const delay = 25 + (Math.random() * 24 - 12);
                typewriterTimer = setTimeout(type, delay);
            } else {
                cursor.style.opacity = "1";
            }
        }
        typewriterTimer = setTimeout(type, 400);
    }
});

onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("keydown", onModalKey);
    if (scrollFrame !== null) cancelAnimationFrame(scrollFrame);
    clearTimeout(typewriterTimer);
    clearTimeout(feedbackTimeout);
});

// --- Projects Modal ---
const isModalOpen = ref(false);
const modalImageUrl = ref("");

const modalCloseRef = ref(null);
let modalOpener = null;

const onModalKey = (e) => {
    if (e.key === "Escape") closeImageModal();
};

const showImageModal = (imageUrl) => {
    modalOpener = document.activeElement;
    modalImageUrl.value = proxiedImage(imageUrl);
    isModalOpen.value = true;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onModalKey);
    nextTick(() => modalCloseRef.value?.focus());
};

const closeImageModal = () => {
    if (!isModalOpen.value) return;
    isModalOpen.value = false;
    modalImageUrl.value = "";
    document.body.style.overflow = "";
    window.removeEventListener("keydown", onModalKey);
    modalOpener?.focus?.(); // return focus to the card that opened it
};

// --- Contact Form ---
const form = ref({
    name: "",
    email: "",
    message: "",
    honeypot: "",
});

const errors = ref({
    name: "",
    email: "",
    message: "",
});

const submitStatus = ref(null); // 'null', 'success', 'error'
const isSubmitting = ref(false);
let feedbackTimeout = null;

function validateEmail(email) {
    return /^[^\s @]+@[^\s @]+\.[^\s @]+$/.test(email);
}

function validateForm() {
    let valid = true;
    errors.value = { name: "", email: "", message: "" };

    if (!form.value.name.trim()) {
        errors.value.name = "Name is required.";
        valid = false;
    }
    if (!form.value.email.trim()) {
        errors.value.email = "Email is required.";
        valid = false;
    } else if (!validateEmail(form.value.email)) {
        errors.value.email = "Please enter a valid email address.";
        valid = false;
    }
    if (!form.value.message.trim()) {
        errors.value.message = "Message is required.";
        valid = false;
    }
    return valid;
}

const submitForm = async () => {
    submitStatus.value = null;

    if (!validateForm()) {
        return;
    }

    if (form.value.honeypot) {
        isSubmitting.value = false;
        return;
    }

    isSubmitting.value = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                access_key: "f82722bc-7f34-4d62-b7a9-9264f74e54c8",
                name: form.value.name,
                email: form.value.email,
                message: form.value.message,
            }),
        });

        const result = await response.json();
        if (result.success) {
            submitStatus.value = "success";
            form.value = { name: "", email: "", message: "", honeypot: "" };
        } else {
            submitStatus.value = "error";
        }
    } catch {
        submitStatus.value = "error";
    } finally {
        isSubmitting.value = false;
        if (feedbackTimeout) clearTimeout(feedbackTimeout);
        feedbackTimeout = setTimeout(() => {
            submitStatus.value = null;
        }, 4000);
    }
};
</script>

<style scoped>
.section-transition {
    opacity: 0;
    transform: translateY(20px);
    transition:
        opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.is-visible {
    opacity: 1;
    transform: translateY(0);
}
/* ── Availability status chip ── */
.status-chip {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 6px 10px;
    margin-top: 1.25rem;
    padding: 8px 14px;
    border-radius: 9999px;
    border: 1px solid var(--status-edge);
    background: var(--status-bg);
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    letter-spacing: 0.08em;
    color: #cbd5e1;
}
.status-chip--open {
    --status: #34d399;
    --status-edge: rgba(52, 211, 153, 0.45);
    --status-bg: rgba(16, 185, 129, 0.1);
}
.status-chip--mission {
    --status: #fbbf24;
    --status-edge: rgba(251, 191, 36, 0.45);
    --status-bg: rgba(245, 158, 11, 0.1);
}
.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: var(--status);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--status) 25%, transparent);
}
.status-chip--open .status-dot {
    animation: status-pulse 1.8s ease-in-out infinite;
}
@keyframes status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
}
.status-key {
    color: #64748b;
}
.status-value {
    font-weight: 700;
    letter-spacing: 0.14em;
    color: var(--status);
}
.status-note {
    color: #94a3b8;
    letter-spacing: 0.02em;
}
.status-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #e2e8f0;
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, var(--status) 50%, transparent);
    text-underline-offset: 3px;
    transition: color 0.15s ease;
}
.status-link:hover {
    color: var(--status);
}
@media (prefers-reduced-motion: reduce) {
    .status-chip--open .status-dot { animation: none; }
}

.flicker {
    animation: flicker 1.5s infinite alternate;
}

@keyframes flicker {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.mission-dossier {
    position: relative;
    border: 2px solid #0ea5e9; /* sky-500 */
}

.mission-dossier:before,
.mission-dossier:after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: #10b981; /* emerald-500 */
    border-style: solid;
}

.mission-dossier:before {
    top: -5px;
    left: -5px;
    border-width: 2px 0 0 2px;
}

.mission-dossier:after {
    bottom: -5px;
    right: -5px;
    border-width: 0 2px 2px 0;
}

.signal-transmitter {
    box-shadow: 0 0 15px #10b981; /* emerald-500 */
}

.terminal-container {
    min-height: 3rem;
    box-shadow:
        0 0 12px rgba(16, 185, 129, 0.08),
        inset 0 0 20px rgba(16, 185, 129, 0.03);
}

.cursor {
    animation: blink-cursor 0.7s step-end infinite;
}

@keyframes blink-cursor {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}
</style>
