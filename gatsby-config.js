module.exports = {
  siteMetadata: {
    title: "na_visualization",
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress-experimental",
      options: {
        url: "https://wordpress.org/plugins/shortcodes-ultimate/",
      },
    },
    "gatsby-plugin-styled-components",
  ],
};
