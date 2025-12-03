#!/bin/bash

CACHE="$HOME/.cache/volume_backend"
mkdir -p "$(dirname "$CACHE")"

CURRENT=$(cat "$CACHE" 2>/dev/null || echo "pipewire")

# Unbind old keys (IMPORTANT: correct syntax)
hyprctl keyword unbind ",F9"
hyprctl keyword unbind ",F10"
hyprctl keyword unbind ",F11"

if [[ "$CURRENT" == "pipewire" ]]; then
    # Switch → swayosd
    hyprctl keyword bindl ",F9, exec, swayosd-client --output-volume raise"
    hyprctl keyword bindl ",F10, exec, swayosd-client --output-volume lower"
    hyprctl keyword bindl ",F11, exec, swayosd-client --output-volume mute-toggle"

    echo "swayosd" > "$CACHE"
    notify-send -t 1200 "Volume backend: swayosd"
else
    # Switch → pipewire native
    hyprctl keyword bindl ",F9, exec, wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+"
    hyprctl keyword bindl ",F10, exec, wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"
    hyprctl keyword bindl ",F11, exec, wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"

    echo "pipewire" > "$CACHE"
    notify-send -t 1200 "Volume backend: PipeWire (120%+)"
fi

