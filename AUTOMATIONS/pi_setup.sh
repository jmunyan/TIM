#don't try this, just getting a head start. It's close but I need to double check file locations and types.

cd Desktop
echo "chromium --start-fullscreen --app=\"https://drive.google.com/drive/folders/1fwmyBGCLWtqj9Qj5nIgJ5-Z1_jsO3w01?usp=sharing\" --no-sandbox --disable-extensions --kiosk" > ppc_pi_startup.sh
chmod +x ppc_pi_startup.sh
echo "~/Desktop/ppc_pi_starup.sh" >> ~/.config/labwc/autostart
