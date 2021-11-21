function tweetURL(id) {
  return `https://twitter.com/${process.env.TW_USERNAME}/status/${id}`;
}

const tweetMetrics = (tweet) => {
  let content = '';

  if (tweet.public_metrics?.retweet_count > 0) {
    content += `${process.env.TW_RETWEET_ICON} ${tweet.public_metrics.retweet_count} `;
  }
  if (tweet.public_metrics?.like_count > 0) {
    content += `${process.env.TW_LIKES_ICON} ${tweet.public_metrics.retweet_count}`;
  }
  return content;
};

module.exports = {
  tweetURL,
  tweetMetrics,
};
