import post from '@/utils/post';
import { demo } from './adapter';
// get加括号，第二个参数为{
//   params
// }

export const getShowArticle = async params => await demo.get(
  '/articl/',
  { params }
);
export const getLocation = async params => await demo.get(
  '/articl/',
  { params }
);
export const getAll = async params => await demo.get(
  '/articl/',
  { params }
);
// export const postArticle = async data => await demo.post(
//   '/articl/',
//   data
// );
export const postArticle = post('/addarticl/');
export const getArticleSearch = async params => await demo.get(
  '/articl/',
  { params }
);
export const getBeen = async params => await demo.get(
  '/articl/',
  { params }
);
export const deleteArticle = async params => await demo.get(
  '/articl/',
  { params }
);
export const getArticlesByLocation = async params => await demo.get(
  '/articl/',
  { params: { ...params, action: 'search_by_location' } }
);


// 个人空间部分接口---张羽冰
export const getMyArticles = async params => await demo.get(
  '/ShowMyArticles/',
  { params }
);
export const getArticleDetail = async params => await demo.get(
  '/ArticleDetail/',
  { params }
);
export const getSearchByLocation = async params => await demo.get(
  '/SearchByLocation/',
  { params }
);
// export const getSearchByDate = get('/SearchByDate/');
export const getSearchByDate = async params => await demo.get(
  '/SearchByDate/',
  { params }
);
export const getSummary = async params => await demo.get(
  '/Summary/',
  { params }
);
export const getMyLike = async params => await demo.get(
  '/MyLike/',
  { params }
);
export const getMyFollow = async params => await demo.get(
  '/ShowFollow/',
  { params }
);


// post，delete，put不加括号，第二个参数直接为params
// post第一个参数为url，调用处传params
export const postRegUser = post('/regist/');

export const postLogUser = post('/login/');

// 文章的点赞、评论
export const postRemark = post('/remark/');
// export const postRemark = async data => await demo.post(
//   '/remark/',
//   data
// );
export const postLike = post('/like/');
export const postDeLike = post('/dellike/');
export const postFollow = post('/follow/');
export const postDeFollow = post('/delfollow/');

