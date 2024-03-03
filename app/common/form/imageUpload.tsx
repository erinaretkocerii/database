import React from 'react'
import { useStore } from '../../stores/store';

export const imageUpload = () => {
    const { bookStore } = useStore();
  return (
    <>
    <input name="image" placeholder="Image" type="file" ></input>
    </>
  )
}
