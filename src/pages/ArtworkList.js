import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ArtworkList = ({
  collections,
  collectionSelect,
  setCollections,
  handleArtworkUpdateSelect
}) => {
  const [artworks, setArtworks] = useState([])
  let navigate = useNavigate()
  let { collectionId, index } = useParams()

  useEffect(() => {
    const getArtworks = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/artworks/${collectionId}`
      )
      setArtworks(res.data.artworks)
    }
    getArtworks()
  }, [])

  const handleClickDeleteCollection = async () => {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/collection/${collectionId}`
    )
    const updateState = () => {
      let tempArray = collections
      tempArray.splice(index, 1)
      setCollections(tempArray)
    }
    await updateState()
    navigate('/')
  }

  const refreshPage = () => {
    window.location.reload()
  }

  const handleClickDeleteArtwork = async (artwork) => {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/artworks/${artwork._id}`
    )
    refreshPage()
  }

  const navigateShare = () => {
    navigate('/share')
  }

  return artworks.length ? (
    <div>
      <h1 id="collection-name">
        The "<em>{`${collectionSelect.collection_name}`}</em>" Collection
      </h1>
      <div className="removeCollection">
        <button onClick={handleClickDeleteCollection} className="removeButton">
          Delete Collection
        </button>
      </div>
      <div className="artworks-grid">
        {artworks?.map((artwork, index) => (
          <div className="artworkCard" key={index}>
            <div className="artwork-img-grid">
              <img src={artwork.image} alt={artwork.piece_name} />
            </div>
            <div className="artwork-name-grid">
              <h4>{artwork.piece_name}</h4>
              <p>
                <span>
                  <strong>Artist:</strong> {artwork.artist_name}
                </span>
              </p>
              <p>
                <span>
                  <strong>Price:</strong> {artwork.price}
                </span>
              </p>
            </div>
            <div className="buttons">
              <button
                onClick={() => handleArtworkUpdateSelect(collectionId, artwork)}
                className="artworkListButtons"
              >
                Edit Info
              </button>
              <button
                onClick={() => handleClickDeleteArtwork(artwork)}
                className="artworkListButtons"
              >
                Remove Artwork
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <h1 id="collection-name">
        The "<em>{`${collectionSelect.collection_name}`}</em>" Collection
      </h1>
      <div className="removeCollection">
        <button onClick={handleClickDeleteCollection} className="removeButton">
          Delete Collection
        </button>
      </div>
      <div className="no-artworks">
        <h3>There are no artworks yet. Be the first to add your art!</h3>
        <button onClick={() => navigateShare()}>Add Art</button>
      </div>
    </div>
  )
}

export default ArtworkList
