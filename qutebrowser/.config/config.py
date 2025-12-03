config.load_autoconfig()

config.bind('<F1>', 'jseval document.querySelector("video").playbackRate = 2.0')
config.bind('<F2>', 'jseval document.querySelector("video").playbackRate = 1.5')
config.bind('<F3>', 'jseval document.querySelector("video").playbackRate = 1.0')

# Bind a key to toggle YouTube subtitles/captions.
# The JavaScript selector targets the "cc" button on the video player.
config.bind(',c', 'jseval -q document.querySelector("button.ytp-subtitles-button").click()')
config.bind(',l', 'jseval document.querySelector("video").loop = !document.querySelector("video").loop')

config.bind(',q', 'open javascript:document.getElementById("movie_player")?.setPlaybackQualityRange("hd1080");document.getElementById("movie_player")?.setPlaybackQuality("hd1080");')

config.bind(';i', 'hint images download')
config.bind(';u', 'hint images yank')

#time jumping for video 

config.bind(',t', 'jseval (function(){ \
    const input = prompt("Jump to time (mm:ss or seconds):"); \
    if(input){ \
        let secs = 0; \
        if(input.includes(":")){ \
            const parts = input.split(":").map(Number); \
            secs = parts[0]*60 + parts[1]; \
        } else { \
            secs = Number(input); \
        } \
        const vid = document.querySelector("video"); \
        if(vid && secs <= vid.duration) vid.currentTime = secs; \
    } \
})()')


# Force-render all web contents using a dark theme.
c.colors.webpage.darkmode.enabled = True


# Increase the contrast to enhance "depth and darkness"
# The default is 0.0. A value of 0.3 or 0.4 often works well.
#c.colors.webpage.darkmode.contrast = 0

# Choose a different color modification algorithm (optional, but often better)

# --- Search engines ---
c.url.searchengines = {
    'DEFAULT': 'https://duckduckgo.com/?q={}',
    'g':       'https://www.google.com/search?q={}',
    'yt':     'https://www.youtube.com/results?search_query={}&disable_polymer=1' ,
}

c.content.user_stylesheets = ["~/.config/qutebrowser/youtube.css"]

# --- Bind ,s to open a search prompt using the default search engine (DuckDuckGo) ---
config.bind(',s', 'cmd-set-text -s :open ')
config.bind('yt', 'cmd-set-text -s :open yt')
config.bind(',g', 'cmd-set-text -s :open g')

c.content.blocking.enabled = True
#c.content.blocking.method = 'adblock'
c.content.blocking.adblock.lists = [
    "https://easylist.to/easylist/easylist.txt",
    "https://easylist.to/easylist/easyprivacy.txt",
    "https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt",
    "https://filters.adtidy.org/extension/chromium/filters/2.txt",
    "https://filters.adtidy.org/extension/chromium/filters/10.txt"
]


