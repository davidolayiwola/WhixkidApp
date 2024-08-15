import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import './CSS_Files/App.css'
//import './CSS_Files/AddBreakingPoint.css'

const App = () => {
	return(
		<div className='app'>
			<Header />
	        <main>
				<Content />
			</main>
	        <Footer />
		</div>
	)
}

export default App