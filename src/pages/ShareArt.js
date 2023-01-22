import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ShareArt = () => {
  let navigate = useNavigate()
  const initialStateCollection = {
    collection_name: '',
    collection_image: ''
  }
  const initialStateArtwork = {
    piece_name: '',
    image: '',
    artist_name: '',
    price: '',
    collection_name: ''
  }
  const [formStateCollection, setFormStateCollection] = useState(
    initialStateCollection
  )
  const [formStateArtwork, setFormStateArtwork] = useState(initialStateArtwork)
  const [collections, setCollections] = useState([])

  useEffect(() => {
    const getCollectionsListDropdown = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/collections`
      )
      setCollections(res.data.collections)
    }
    getCollectionsListDropdown()
  }, [])

  const handleChangeNewCollection = (e) => {
    setFormStateCollection({
      ...formStateCollection,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmitCollection = async (e) => {
    e.preventDefault()
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/collections`,
      formStateCollection
    )
    setFormStateCollection(initialStateCollection)
    navigate('/')
  }

  const handleChangeNewArtwork = (e) => {
    setFormStateArtwork({
      ...formStateArtwork,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitArtwork = async (e) => {
    e.preventDefault()
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/collection/${formStateArtwork.collection_name}/artwork`,
      formStateArtwork
    )
    setFormStateArtwork(initialStateArtwork)
    navigate(`/collection/${formStateArtwork.collection_name}`)
  }

  return (
    <div>
      <h1>Share Your Talent Below!</h1>
      <div className="submissionForms">
        <div className="newCollectionForm">
          <h4>Add A New Collection:</h4>
          <form onSubmit={handleSubmitCollection} className="collectionInputs">
            <label>New Collection Name:</label>
            <input
              type="text"
              required
              id="collection_name"
              onChange={handleChangeNewCollection}
              value={formStateCollection.collection_name}
              placeholder="Collection Name"
            ></input>
            <label>Collection Cover Image:</label>
            <input
              type="text"
              required
              id="collection_image"
              onChange={handleChangeNewCollection}
              value={formStateCollection.collection_image}
              placeholder="Image URL"
            ></input>
            <section className="subButts">
              <button className="submitButtons">Submit Collection!</button>
            </section>
          </form>
        </div>
        <div className="newArtworkForm">
          <h4>Add To An Existing Collection:</h4>
          <form onSubmit={handleSubmitArtwork} className="artworkInputs">
            <label>Select Collection:</label>
            <select
              onChange={handleChangeNewArtwork}
              name="collection_name"
              value={formStateArtwork.collection_name}
              className="chooseCollection"
            >
              {collections?.map(({ _id, collection_name }) => (
                <option key={_id} value={_id}>
                  {collection_name}
                </option>
              ))}
            </select>
            <label>Artist Name:</label>
            <input
              type="text"
              name="artist_name"
              onChange={handleChangeNewArtwork}
              value={formStateArtwork.artist_name}
              required
              placeholder="Artist Name"
            ></input>
            <label>Artwork Name:</label>
            <input
              type="text"
              name="piece_name"
              onChange={handleChangeNewArtwork}
              value={formStateArtwork.piece_name}
              required
              placeholder="Artwork Name"
            ></input>
            <label>Artwork Price:</label>
            <input
              type="text"
              name="price"
              onChange={handleChangeNewArtwork}
              value={formStateArtwork.price}
              required
              placeholder="Artwork Price"
            ></input>
            <label>Artwork Image:</label>
            <input
              type="text"
              name="image"
              onChange={handleChangeNewArtwork}
              value={formStateArtwork.image}
              required
              placeholder="Image URL"
            ></input>
            <section className="subButts">
              <button
                onClick={() => handleSubmitArtwork()}
                className="submitButtons"
              >
                Submit Artwork!
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ShareArt
