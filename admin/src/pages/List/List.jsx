import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const List = ({baseUrl}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const res = await axios.get(`${baseUrl}/api/food/list`);
    if(res.data.success) {
      setList(res.data.data);
    } else {
      toast.error(Error);
    }
  }

  const removeFood = async (id) => {

    // console.log(id)
    const res = await axios.post(`${baseUrl}/api/food/remove`, {id: id});
    if(res.data.success){
      toast.success(res.data.message);
    } else {
      toast.error(Error);
    }
  }

  useEffect(()=> {
    fetchList();
  },[list])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
      </div>
      {list.map((food, index)=>{
        return (
          <div key={index} className='list-table-format'>
            <img src={`${baseUrl}/api/food/image/${food.image}`} alt={food.name} />
            <p>{food.name}</p>
            <p>{food.category}</p>
            <p>${food.price}</p>
            <p onClick={()=>removeFood(food._id)} className='cursor'>x</p>
          </div>
        )
      })}
    </div>
  )
}

export default List
