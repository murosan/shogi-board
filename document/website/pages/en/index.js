'use strict'

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
            <Button href={docUrl('features')}>Usage</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props
    const { baseUrl, playgroundUrl } = siteConfig

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
            image: `${baseUrl}img/shogi-board.jpg`,
            imageAlign: 'left',
          },
        ]}
      </Block>
    )

    const Features = () => (
      <Block layout="twoColumn" background="light">
        {[
          {
            content:
              'PC と最新版 GoogleChrome だけあれば動作する、' +
              'とても軽量な Web アプリケーションです。' +
              '多少のプログラミング知識があれば各自PCにダウンロードしてオフラインでも使用可能。' +
              'macOS を完全にサポートします。' +
              '将棋ソフトを扱う機能も開発中です。',
            title: 'ブラウザで動作',
          },
          {
            content:
              'ルール通りに駒を動かすことができます。' +
              '王手放置・打ち歩詰めも防止します。' +
              '棋譜作成・分岐の作成も可能。<br>' +
              '棋譜の保存・取り込み機能などは今年中にリリースします。',
            title: '検討・棋譜並べに最適',
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
  'ブラウザで動く将棋盤！将棋の検討・棋譜並べができる、軽量で無料な将棋盤Webアプリケーションです。' +
  '各自PCにダウンロードして、オフラインでも使用可能。棋譜作成にも対応しています。'

module.exports = Index
