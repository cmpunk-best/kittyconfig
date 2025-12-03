#!/bin/bash
# Simple macOS-style Wi-Fi dropdown for Waybar

# Ensure NetworkManager is running
# rofi-based Wi-Fi selector (better themed version)

# Get available Wi-Fi networks

#!/bin/bash

# Get list of available Wi-Fi networks
networks=$(nmcli -t -f SSID,SIGNAL device wifi list | awk -F: '!/^$/ {printf "%-40s %s%%\n", $1, $2}' | uniq)

# If no networks found
if [ -z "$networks" ]; then
    notify-send "Wi-Fi" "No networks found"
    exit 1
fi

# Show list in plain wofi
chosen=$(echo "$networks" | wofi --dmenu --prompt "Select Wi-Fi" --width 600 --height 400)

# Extract SSID (everything before signal strength)
ssid=$(echo "$chosen" | sed 's/[[:space:]]\+[0-9]\+%//')

# If user selected something
if [ -n "$ssid" ]; then
    nmcli device wifi connect "$ssid" || notify-send "Wi-Fi" "Failed to connect to $ssid"
fi

