import React from 'react';
import './SearchPage.css';
import { useStateValue } from '../StateProvider';
import useGoogleSearch from '../useGoogleSearch';
import Response from '../response';
import { Link } from '@material-ui/core';
import Search from '../components/Search';
import SearchIcon from '@material-ui/icons/Search';
import ImageIcon from '@material-ui/icons/ImageSearch';
import NewsIcon from '@material-ui/icons/Description';
import MapIcon from '@material-ui/icons/RoomOutlined';
import MoreIcon from '@material-ui/icons/MoreVertRounded';

function SearchPage() {
    const [{ term }, dispatch] = useStateValue();
    const { data } = useGoogleSearch(term); 

    //MOCK API
    //const data = Response;

    return (
        <div className="SearchPage">
            <div className="searchPage_header">
                <Link to="/">
                    <img 
                      className="searchPage_logo"
                      src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                      alt=""
                    />
                </Link>
                <div className="searchPage_headerBody">
                    <Search hideButtons />
                    <div className="searchPage_options">
                        <div className="searchPage_optionsLeft">
                            <div className="searchPage_option">
                                <SearchIcon />
                                <Link to="/all">All</Link>
                            </div>
                            <div className="searchPage_option">
                                <ImageIcon />
                                <Link to="/images">Images</Link>
                            </div>
                            <div className="searchPage_option">
                                <NewsIcon />
                                <Link to="/news">News</Link>
                            </div>
                            <div className="searchPage_option">
                                <MapIcon />
                                <Link to="/maps">Maps</Link>
                            </div>
                            <div className="searchPage_option">
                                <MoreIcon />
                                <Link to="/more">More</Link>
                                
                            </div>
                        </div>

                        <div className="searchPage_optionsRight">
                            <div className="searchPage_option">
                                <Link to="/settings">Settings</Link>
                            </div>
                            <div className="searchPage_option">
                                <Link to="/tools">Tools</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {term && (
                <div className="searchPage_results">
                    <p className="searchPage_resultsCount"> About {data?.searchInformation.formattedTotalResults}
                      <span> </span>({data?.searchInformation.formattedSearchTime} seconds)
                    </p>
                    { data?.items.map( item => (
                        <div className="searchPage_result">
                            <a href={item.link}> 
                                {item.pagemap?.cse_image?.length > 0 && item.pagemap.cse_image[0].src && 
                                (
                                    <img className="searchPage_resultImage"
                                     src={item.pagemap.cse_image[0].src} 
                                     alt=""
                                    />
                                ) }
                                {item.displayLink} 
                            </a>
                            <a className="searchPage_resultTitle" href={item.link}>
                                <h2>{item.title}</h2>
                            </a>
                            <p className="searchPage_resultSnippet">
                                {item.snippet}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            
        </div>
    )
}

export default SearchPage;