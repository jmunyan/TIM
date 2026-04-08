#don't try this, just getting a head start. It's close but I need to double check file locations and types.

cd Desktop
echo "chromium --start-fullscreen --app=\"https://docs.google.com/document/d/1-pa7znALia9DO3dOlQ901sdS3cowmzJXYPLWubdw1DY/view?usp=drivesdk\" --no-sandbox --disable-extensions --kiosk" > ppc_pi_startup.sh
chmod +x ppc_pi_startup.sh
echo "~/Desktop/ppc_pi_starup.sh" >> ~/.config/labwc/autostart
