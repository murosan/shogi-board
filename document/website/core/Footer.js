const React = require('react')

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl
    const docsUrl = this.props.config.docsUrl
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    return `${baseUrl}${docsPart}${langPart}${doc}`
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl
    return baseUrl + (language ? `${language}/` : '') + doc
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>遊ぶ</h5>
            <a href={this.pageUrl('playground.html')}>Web将棋盤</a>
            <h5>ドキュメント</h5>
            <a href={this.docUrl('features.html', this.props.language)}>
              Getting Started
            </a>
          </div>
          <div>
            <h5>その他</h5>
            <a href={`${this.props.config.baseUrl}blog`}>リリースノート</a>
            <a href={this.props.config.repoUrl}>ソースコード(GitHub)</a>
            <a href={`${this.props.config.repoUrl}/issues`}>
              質問・不具合報告(GitHub - Issues)
            </a>

            <div className="github-star-container">
              <a
                className="github-button"
                href={this.props.config.repoUrl}
                data-icon="octicon-star"
                data-count-href="/facebook/docusaurus/stargazers"
                data-show-count="true"
                data-count-aria-label="# stargazers on GitHub"
                aria-label="Star this project on GitHub"
              >
                Star
              </a>
            </div>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    )
  }
}

module.exports = Footer
