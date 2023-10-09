import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import '../tintuc/listitem.scss'
import { listofnews } from '../../share/listOfnews';
const NewsPage = () => {
  return (
    <>
      <Container maxWidth="md" style={{  }} className='Container-n'>
        <Paper elevation={3} style={{ padding: '20px',margin: '120px 0 50px 0',boxShadow:'none',backgroundColor:'rgb(235, 239, 242)'}}  className='list-news'>
          <List >
            {listofnews.map((news, index) => (
              <ListItem key={index}>
                <div className='news-c'>
                  <img alt={`News ${index + 1}`} src={news.img} />
                  <ListItemText
                    className='ct-n'
                    primary={news.title}
                    secondary={news.shortinfo}
                  />
                </div>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container >
   
    </>
  );
};

export default NewsPage;
