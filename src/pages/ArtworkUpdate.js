import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateArtwork = () => {
  let navigate = useNavigate()
  const initialState = {
    artist_name: '',
    piece_name: '',
    price: '',
    image: ''
  }
  const [formState, setFormState] = useState(initialState)
  let { collectionId, artworkId } = useParams()

  const getArtwork = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/artwork/${artworkId}`
    )
    setFormState(res.data.artwork[0])
  }

  const handleChange = (e) => {
    e.preventDefault()
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }

  const updateArtwork = async (e) => {
    e.preventDefault()
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/artwork/${artworkId}`,
      formState
    )
    navigate(`/collection/${collectionId}`)
  }

  useEffect(() => {
    getArtwork()
  }, [])

  return (
    <div>
      <div className="updateArtworkForm">
        <h3 className="updateTitle">Update Your Artwork Below:</h3>
        <form onSubmit={updateArtwork} className="updateInputs">
          <label>Artist Name:</label>
          <input
            type="text"
            required
            id="artist_name"
            onChange={handleChange}
            value={formState.artist_name}
            placeholder="Artist Name"
          ></input>
          <label>Artwork Name:</label>
          <input
            type="text"
            required
            id="piece_name"
            onChange={handleChange}
            value={formState.piece_name}
            placeholder="Artwork Name"
          ></input>
          <label>Artwork Price:</label>
          <input
            type="text"
            required
            id="price"
            onChange={handleChange}
            value={formState.price}
            placeholder="Artwork Price"
          ></input>
          <label>Artwork Image:</label>
          <input
            type="text"
            required
            id="image"
            onChange={handleChange}
            value={formState.image}
            placeholder="Image URL"
          ></input>
          <section className="subButts">
            <button className="submitButtons">Submit Updates!</button>
          </section>
        </form>
      </div>
    </div>
  )
}

export default UpdateArtwork
