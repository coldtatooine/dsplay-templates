// What the components read from @dsplay/react-template-utils, in one place: tests set `player` and mock the module with `mockUtils`.
export const player = { media: {}, template: {}, locale: 'pt_br' };

export const mockUtils = () => ({
  useMedia: () => player.media,
  useConfig: () => ({ locale: player.locale }),
  useTemplateVal: (key, fallback) => (player.template[key] === undefined ? fallback : player.template[key]),
  Loader: ({ children }) => children,
  FittedText: ({
    text, className, style, children,
  }) => <span className={className} style={style}>{children !== undefined ? children : text}</span>,
});
