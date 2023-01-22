import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import ArtworkList from './pages/ArtworkList'
import ShareArt from './pages/ShareArt'
import ArtworkUpdate from './pages/ArtworkUpdate'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const App = () => {
  ///// STATE /////
  const [collectionSelect, setCollectionSelect] = useState('')
  const [collections, setCollections] = useState([])
  const [artworkUpdateSelect, setArtworkUpdateSelect] = useState('')
  const [artwork, setArtwork] = useState([])

  let navigate = useNavigate()

  ///// FUNCTIONS /////
  const handleCollectionSelect = (collection) => {
    setCollectionSelect(collection)
    navigate(`/collection/${collection._id}`)
  }

  const handleArtworkUpdateSelect = (collectionId, artwork) => {
    setArtworkUpdateSelect(artwork)
    navigate(`/collection/artworkUpdate/${collectionId}/${artwork._id}`)
  }

  ///// DISPLAY RETURNS /////
  return (
    <div className="App">
      <Link to="/" className="logoHeader">
        <h1>Your Art Gallery</h1>
      </Link>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleCollectionSelect={handleCollectionSelect}
                collections={collections}
                setCollections={setCollections}
              />
            }
          />
          <Route
            path="/collection/:collectionId"
            element={
              <ArtworkList
                collectionSelect={collectionSelect}
                collections={collections}
                artwork={artwork}
                setCollections={setCollections}
                handleArtworkUpdateSelect={handleArtworkUpdateSelect}
              />
            }
          />
          <Route path="/share" element={<ShareArt />} />
          <Route
            path="/collection/artworkUpdate/:collectionId/:artworkId"
            element={
              <ArtworkUpdate
                artwork={artwork}
                setArtwork={setArtwork}
                artworkUpdateSelect={artworkUpdateSelect}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
