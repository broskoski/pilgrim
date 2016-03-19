import Q from 'bluebird-q';
import read from 'node-readability';
import qs from 'qs';
import { map, filter } from 'lodash';
import parseLinks from '../lib/parse_links';
import url from 'url';

let { ABSTRACT_ENDPOINT } = process.env;

export default (url) => {
  return Q.promise((resolve, reject) => {
    read(url, (err, article, meta) => {
      if(err){
        return reject(err);
      }
      parseLinks(article.content).then((hrefs) => {
        resolve({
          html: article.content,
          title: article.title,
          hrefs: hrefs
        });
        return article.close();
      }).catch((err) =>{ return reject(err) });
    })
  });
}
