#!/bin/bash
#
# Be VERY Careful. This script may be executed with admin privileges.

echo "Openframe Image -- install.sh"

# Some limited platform detection might be in order... though at present we're targeting the Pi
os=$(uname)
arq=$(uname -m)

if [ $os == "Linux" ]; then

    # on Debian Linux distributions
    # Unlikely that people will be doing this as a separate install, since it comes with
    # (and will be updated with) openframe
    # sudo apt-get update
    # do we really want to upgrade? this could take a damn long time.
    # sudo apt-get upgrade

    # same for any debian disto (untested), including rpi (tested)
    sudo apt-get install -y fbi

    if [ $arq == "armv7l" ]; then
        # on RaspberryPi

        # ####
        #
        # FOR NOW, CODE GOES HERE since we're shooting for RPi support
        #
        # ####
        echo "armv7l"


    else
        # Non-arm7 Debian...
        echo "non armv7l"
    fi

elif [ $os == "Darwin" ]; then
    # OSX
    echo "osx"
fi
