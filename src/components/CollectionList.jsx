const CollectionList = (props) => {

  return (
    <div>
      <div className="collection-grid" onClick={props.onClick}>
        <div className="img-container">
          <img src={props.collection_image} alt={props.collection_name} />
        </div>
        <div className="name-container">
          <h3>{props.collection_name}</h3>
        </div>
      </div>
    </div>
  )
}

export default CollectionList