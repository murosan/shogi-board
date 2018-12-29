import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// tsconfig.json で
// --isolatedModules: true にしているので必要
export default undefined
