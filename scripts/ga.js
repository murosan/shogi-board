'use strict'
const path = require('path')
const fs = require('fs')

const cmd = process.argv[2]
const index = path.resolve(__dirname, `../public/index.html`)

const gaToken = '<!-- Google Analytics -->'
const gaScript = `
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-104937240-2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-104937240-2');
</script>
`

const content = fs.readFileSync(index, 'utf-8')
let replaced
if (cmd === 'insert') replaced = content.replace(gaToken, gaScript)
if (cmd === 'remove') replaced = content.replace(gaScript, gaToken)
if (!replaced) throw new Error('Argument is needed. insert or remove')

fs.writeFileSync(index, replaced)
