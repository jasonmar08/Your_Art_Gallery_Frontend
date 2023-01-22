import { useEffect } from 'react'
import axios from 'axios'
import CollectionList from '../components/CollectionList'

const Home = ({ handleCollectionSelect, collections, setCollections }) => {
  useEffect(() => {
    const getCollections = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/collections`
      )
      setCollections(res.data.collections)
    }
    getCollections()
  }, [])

  return (
    <div>
      <h2>Collections:</h2>
      <div className="home-collections">
        {collections?.map((collection, index) => (
          <div key={collection._id}>
            <CollectionList
              collection_image={collection.collection_image}
              collection_name={collection.collection_name}
              onClick={() => handleCollectionSelect(collection, index)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
