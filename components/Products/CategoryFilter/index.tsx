import React,{useEffect, Dispatch, SetStateAction, useState} from 'react';
import {useRouter} from "next/router";
import { FilterContainer, Filter, FilterText } from './styles';
import { Dropdown } from '../../Form';
import { categories, colors} from "../../../utils/data/productCat";


const sortOptions = ["依時間(最新)", "依價格(高到低)", "依價格(低到高)"]

interface Props {
  currentCat:string;
  setCurrentCat:Dispatch<SetStateAction<string>>;
  currentColor:string;
  setCurrentColor:Dispatch<SetStateAction<string>>;
}

const SORT_MAP = {
  "依時間(最新)":"newest",
  "依價格(高到低)":"desc",
  "依價格(低到高)":"asc",

}

const CategoryFilter:React.FC<Props> = ({currentCat, setCurrentCat, currentColor, setCurrentColor}) => {
    const [sort, setSort] = useState<string>("");
    const router = useRouter();

    const clickHandler = (e:React.MouseEvent<HTMLDivElement>, setItem:Dispatch<SetStateAction<string>>)=>{
        const selectedDiv = e.target as  HTMLDivElement;
        const selectedCategory = selectedDiv.textContent as string;
        setItem(selectedCategory);
    };

    useEffect(()=>{
        if(currentCat||currentColor||sort){
          router.replace(
            {
              pathname: '/products',
              query:  {
                ...router.query,
                page:1,
                color:currentColor,
                category:currentCat,
                sort:sort?SORT_MAP[sort as "依時間(最新)"|"依價格(高到低)"|"依價格(低到高)"]:"newest"
              },
            }
          );
        }
    },[currentCat, currentColor, sort])

  return (
    <FilterContainer>
    <Filter>
      <FilterText>篩選商品：</FilterText>
      <Dropdown title={currentCat?currentCat:"請選擇分類"} 
                options={["全部商品",...categories.map((cat)=>cat.name)]} 
                clickHandler={clickHandler}
                setItem={setCurrentCat}/>
      <Dropdown title={currentColor?currentColor:"請選擇顏色"} 
                options={colors} 
                clickHandler={clickHandler}
                setItem={setCurrentColor}
                />
    </Filter>
    <Filter>
      <FilterText>排列順序：</FilterText>
      <Dropdown title={sort?sort:"依時間(最新)"} 
                options={sortOptions} 
                clickHandler={clickHandler}
                setItem={setSort}/>
    </Filter>
  </FilterContainer>
  )
}

export default CategoryFilter