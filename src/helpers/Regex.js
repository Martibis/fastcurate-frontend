// link regex
export const URL_REGEX = /(https?:\/\/[^\s]+)/g;
export const IMG_REGEX =
  /(https?:\/\/.*\.(?:tiff?|jpe?g|gif|png|svg|ico|heic|webp))(.*)/gim;
export const IPFS_REGEX = /^https?:\/\/[^/]+\/(ip[fn]s)\/([^/?#]+)/gim;
export const POST_REGEX = /^https?:\/\/(.*)\/(.*)\/(@[\w.\d-]+)\/(.*)/i;
export const CCC_REGEX = /^https?:\/\/(.*)\/ccc\/([\w.\d-]+)\/(.*)/i;
export const MENTION_REGEX = /^https?:\/\/(.*)\/(@[\w.\d-]+)$/i;
export const TOPIC_REGEX =
  /^https?:\/\/(.*)\/(trending|hot|created|promoted|muted|payout)\/(.*)$/i;
export const INTERNAL_MENTION_REGEX = /^\/@[\w.\d-]+$/i;
export const INTERNAL_TOPIC_REGEX =
  /^\/(trending|hot|created|promoted|muted|payout)\/(.*)$/i;
export const INTERNAL_POST_TAG_REGEX = /(.*)\/(@[\w.\d-]+)\/(.*)/i;
export const INTERNAL_POST_REGEX = /^\/(@[\w.\d-]+)\/(.*)$/i;
export const CUSTOM_COMMUNITY_REGEX = /^https?:\/\/(.*)\/c\/(hive-\d+)(.*)/i;
export const YOUTUBE_REGEX =
  /(?:youtube.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu.be\/)([^"&?\/\s]{11})/g;
export const YOUTUBE_EMBED_REGEX =
  /^(https?:)?\/\/www.youtube.com\/(embed|shorts)\/.*/i;
export const VIMEO_REGEX =
  /(https?:\/\/)?(www\.)?(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
export const VIMEO_EMBED_REGEX =
  /https:\/\/player\.vimeo\.com\/video\/([0-9]+)/;
export const BITCHUTE_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?bitchute.com\/(?:video|embed)\/([a-z0-9]+)/i;
export const D_TUBE_REGEX = /(https?:\/\/d.tube.#!\/v\/)(\w+)\/(\w+)/g;
export const D_TUBE_REGEX2 = /(https?:\/\/d.tube\/v\/)(\w+)\/(\w+)/g;
export const D_TUBE_EMBED_REGEX = /^https:\/\/emb.d.tube\/.*/i;
export const TWITCH_REGEX =
  /https?:\/\/(?:www.)?twitch.tv\/(?:(videos)\/)?([a-zA-Z0-9][\w]{3,24})/i;
export const DAPPLR_REGEX =
  /^(https?:)?\/\/[a-z]*\.dapplr.in\/file\/dapplr-videos\/.*/i;
export const TRUVVL_REGEX = /^https?:\/\/embed.truvvl.com\/(@[\w.\d-]+)\/(.*)/i;
export const LBRY_REGEX = /^(https?:)?\/\/lbry.tv\/\$\/embed\/.*/i;
export const ODYSEE_REGEX = /^(https?:)?\/\/odysee.com\/\$\/embed\/.*/i;
export const ARCH_REGEX = /^(https?:)?\/\/archive.org\/embed\/.*/i;
export const SPEAK_REGEX =
  /(?:https?:\/\/(?:3speak.([a-z]+)\/watch\?v=)|(?:3speak.([a-z]+)\/embed\?v=))([A-Za-z0-9\_\-\.\/]+)(&.*)?/i;
export const SPEAK_EMBED_REGEX = /^(https?:)?\/\/3speak.([a-z]+)\/embed\?.*/i;
export const TWITTER_REGEX =
  /(?:https?:\/\/(?:(?:twitter\.com\/(.*?)\/status\/(.*))))/gi;
export const SPOTIFY_REGEX =
  /^https:\/\/open\.spotify\.com\/playlist\/(.*)?$/gi;
export const RUMBLE_REGEX =
  /^https:\/\/rumble.com\/embed\/([a-zA-Z0-9-]+)\/\?pub=4/;
export const BRIGHTEON_REGEX =
  /^https?:\/\/(www\.)?brighteon\.com\/(?:embed\/)?(.*[0-9].*)/i;
export const VIMM_EMBED_REGEX = /^https:\/\/www.vimm.tv\/.*/i;
export const SPOTIFY_EMBED_REGEX =
  /^https:\/\/open\.spotify\.com\/(embed|embed-podcast)\/(playlist|show|episode|track|album)\/(.*)/i;
export const SOUNDCLOUD_EMBED_REGEX =
  /^https:\/\/w.soundcloud.com\/player\/.*/i;
export const TWITCH_EMBED_REGEX = /^(https?:)?\/\/player.twitch.tv\/.*/i;
export const BRAND_NEW_TUBE_REGEX =
  /^https:\/\/brandnewtube\.com\/embed\/[a-z0-9]+$/i;
export const LOOM_REGEX = /^(https?:)?\/\/www.loom.com\/share\/(.*)/i;
export const LOOM_EMBED_REGEX = /^(https?:)?\/\/www.loom.com\/embed\/(.*)/i;
export const AUREAL_EMBED_REGEX =
  /^(https?:\/\/)?(www\.)?(?:aureal-embed)\.web\.app\/([0-9]+)/i;
export const ENTITY_REGEX = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi;
export const SECTION_REGEX = /\B(\#[\da-zA-Z-_]+\b)(?!;)/i;
