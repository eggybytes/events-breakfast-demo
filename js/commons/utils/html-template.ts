export const createScriptTag = (src?: string, content?: string): string =>
  `<script defer ${src ? `src="${src}"` : ''}>${content ? content : ''}</script>`;

export const getHeader = ({ tags = [] }: { tags?: string[] }): string => {
  return `
    <!DOCTYPE html>
    <html lang="en-US">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/public/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/public/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/public/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/public/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/public/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/public/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/public/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/public/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="/public/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="/public/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/public/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/public/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/public/favicon-128.png" sizes="128x128" />
        <meta name="application-name" content="eggy"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="/public/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="/public/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/public/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/public/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/public/mstile-310x310.png" />

        ${tags.join('\n')}
      </head>
      <body>
        <div id="root" class="root">`;
};

export function getFooter({ bundle }: { bundle: string }): string {
  return `</div>
      <script defer src="/${bundle}"></script>
    </body>
  </html>
  `;
}

export const bundlePrefix = () => {
  return '';
};
