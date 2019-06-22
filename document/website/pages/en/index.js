const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props
    const { baseUrl, docsUrl, playgroundUrl } = siteConfig
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    )

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    )

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    )

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    )

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    )

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/icon.svg`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={playgroundUrl}>Try It Out</Button>
            <Button href={docUrl('getting-started')}>Usage</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props
    const { baseUrl, docsUrl, playgroundUrl } = siteConfig
    const gettingStarted = `${docsUrl}/getting-started`
    const useEngine = `${docsUrl}/use-engine`
    const sbserverUrl = 'https:/github.com/murosan/shogi-board-server'

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="left"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    )

    const TryOut = () => (
      <Block layout="twoColumn" background="dark">
        {[
          {
            title: 'Getting Started',
            content: `
ダウンロード不要で試すには [Playground](${playgroundUrl}) から  
Git・Node.js を扱える方は以下のように始めることができます  

\`\`\`sh
$ git clone https://github.com/murosan/shogi-board.git
$ cd shogi-board
$ yarn
$ yarn start
\`\`\`
`,
          },
          {
            title: '',
            imageAlt: 'image',
            image: `${baseUrl}img/shogi-board.gif`,
            imageAlign: 'left',
          },
        ]}
      </Block>
    )

    const Features = () => (
      <Block layout="twoColumn" background="light">
        {[
          {
            title: '将棋の検討をブラウザで',
            content:
              'ブラウザで動作する軽量な将棋盤 Web アプリケーションです<br>' +
              'PWA に対応しているため、オフラインでも使用可能<br>' +
              'macOS を完全にサポートします<br><br>' +
              'ルール通りに駒を動かすことができ<br>' +
              '王手放置・打ち歩詰め防止機能など<br>' +
              '検討に必要な最低限の機能が付いています',
          },
          {
            title: '将棋ソフトを用いた検討',
            content:
              `<u>[shogi-board-server](${sbserverUrl})</u> ` +
              'と合わせて使うことで<br>' +
              '将棋ソフトを使って検討することができます。<br>' +
              'もちろん macOS でも動作します<br><br>' +
              `使い方は以下のドキュメントをご覧ください<br>` +
              `- <u>[Getting Started](${gettingStarted})</u><br>` +
              `- <u>[将棋ソフトを使って検討する方法](${useEngine})</u>`,
          },
        ]}
      </Block>
    )

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer noPadding">
          <Features />
          <TryOut />
        </div>
      </div>
    )
  }
}

Index.description =
  'ブラウザで動く将棋盤。将棋の検討・棋譜並べができる、軽量で無料な将棋盤Webアプリケーションです。' +
  'オフラインでも使用可能。将棋ソフトを使った検討もできます。'

module.exports = Index
