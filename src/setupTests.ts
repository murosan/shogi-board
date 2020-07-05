import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// https://github.com/mobxjs/mobx-react-lite/#observer-batching
import 'mobx-react-lite/batchingForReactDom'

configure({ adapter: new Adapter() })
