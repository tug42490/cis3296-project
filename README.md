# AutoMod

AutoMod is a Discord Bot meant for filtering out messages in a server that contain blocked words, the list of which can be dynamically adjusted. AutoMod is easy to add and setup, and does not require messing around in files trying to change the list of blocked words. This is the final project for Jacob Musser and William Morris for CIS3296 at Temple University.

# Setting Up the Bot

## If You Are Hosting The Bot:

The code hosted here can be run after making one or two specific changes. First, this requires Node JS and Discord JS to run (Relevant download links from this page: https://discordjs.guide/preparations/). Second, the config.json file has an attribute that needs to be changed, token. Discord Tokens are not able to be uploaded to the Internet in an effort to prevent the bot from being hacked. If you are unable to directly contact someone with the correct token, you can create an identical bot and use that token instead. Skip the next paragraph if you have the correct token.

To create a new bot, go to the Discord Developer Portal (Found here, https://discord.com/developers/applications). After signing in, create a new application called AutoMod. Go to the Bot tab then, where you can copy and paste the new token. In order to add this bot to servers, use the following link, but use the Client ID from your new bot, found under the General tab (Add the Client ID after the 'client_id=' part of the URL, https://discord.com/oauth2/authorize?client_id=&scope=bot).

Once the token has been updated, from the Command Line in the root of the project, type 'node index.js' to run the bot.

## If You Are Not Hosting The Bot:

In order to add the bot to a server, paste the link https://discord.com/oauth2/authorize?client_id=783550963675561995&scope=bot in any browser, and select the server for the bot to join (If someone has made an identical bot, use the invite link they gave). The bot will immediately be functioning.

# Running the Bot

The bot has 3 unique commands in addition to some basic ones such as !help. These are:

- !banword [word] : This command adds the following word to the blocked list of words. Note that this command requires a word following it, and only the first word listed will be blocked. This command does nothing if the word is already on the list.

- !unbanword [word] : This command removes the following word from the blocked list of words. Note that this command requires a word following it, and only the first word listed will be removed. This command does nothing if the word is not on the list.

- !seebannedwords : This command makes the bot print a list of all words that are blocked. This command does not require any additional arguments.
