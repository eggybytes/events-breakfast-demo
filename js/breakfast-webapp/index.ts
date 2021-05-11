try {
  require('./dist/server');
} catch (e) {
  const serviceName = __dirname.split('/').pop();
  throw new Error(`
    ${e}

    Oops, you haven't built! Please run "yarn build:${serviceName}" (or "yarn build:${serviceName} --watch") before starting ${serviceName}.`
  );
}

export {};
