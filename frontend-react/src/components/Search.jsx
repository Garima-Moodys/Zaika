import { Icon } from '@passfort/castle'

export default function Search({cc,content,setFilteredContent}){

    function handleChange(e){
        let searchValue=e.target.value;
        if(cc === 'categories'){
            let filteredArr=content.filter(category=>category.strCategory.toLowerCase().startsWith(searchValue.toLowerCase()));
            setFilteredContent(filteredArr);
        }else{
            let filteredArr=content.filter(meal=>meal.strMeal.toLowerCase().startsWith(searchValue.toLowerCase()));
            setFilteredContent(filteredArr);
        }
    }

    return(
        <div style={{border:'2px solid lightgray',borderRadius:'10px',width:'50%',margin:'auto',padding:'5px 10px'}}>
            <input type="text" placeholder="Search Menu"  onChange={handleChange} style={{width:'96%',borderRadius:'inherit',outline:'none',padding:'3px'}}/>
            <Icon icon="search" color="black" size="sm" />
        </div>
    )
}