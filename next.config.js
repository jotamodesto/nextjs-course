const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = phase => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "dbOwner",
        mongodb_password: "JeXBs4hPoNYAcfSu",
        mongodb_clustername: "cluster0",
        mongodb_database: "next-blog",
      },
    };
  }

  return {
    env: {
      mongodb_username: "dbOwner",
      mongodb_password: "JeXBs4hPoNYAcfSu",
      mongodb_clustername: "cluster0",
      mongodb_database: "next-blog",
    },
  };
};
