const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const pool = require('./db.js');
module.exports = {

  getAllProd: function(cb) {
    pool.query('SELECT * FROM product limit 10', (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res);
      }
    })
  },

  getProdInfo: function(id, cb) {
    // pool
    //   .query('SELECT * FROM product WHERE id = $$1', [id])
    //   .then((res) => {
    //     pool
    //       .query('SELECT * FROM features WHERE product_id = $$1',[id])
    //       .then((result) => {
    //         res.rows[0]['features'] = result.rows;
    //         cb(null, res.rows);
    //       })
    //       .catch((err) => {
    //         cb(err);
    //       })
    //   })
    //   .catch((err) => {
    //     cb(err);
    //   })
    pool
      .query("SELECT json_build_object('id', (SELECT id from product where id = $1), 'name', (SELECT name from product where id = $1 ),'slogan', (SELECT slogan from product where id = $1),'description', (SELECT description from product where id = $1), 'category', (SELECT category from product where id = $1), 'default_price', (SELECT default_price from product where id = $1),'features', (SELECT json_agg(row_to_json(features)) from (SELECT feature, value from features where product_id = $1)features ));", [id])
      .then((result) => {
        cb(null, result.rows[0]['json_build_object']);
      })
      .catch((err) => {
        cb(err);
      })
  },

  getStyles: function(id, cb) {
    // pool
    //   .query('SELECT * FROM styles WHERE productid = $1', [id])
    //   .then((resStyle) => {
    //     Promise.all(resStyle.rows.map((item) => new Promise((resolve, reject) => {
    //       pool
    //       .query('SELECT url, thumbnail_url FROM photos WHERE styleid = $$1', [item['style_id']])
    //       .then((resPhotos) => {
    //         item['photos'] = resPhotos.rows;
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       })
    //       .then((res) => {
    //         pool
    //         .query('SELECT size, quantity FROM skus WHERE styleid = $1', [item['style_id']])
    //         .then((resSkus) => {
    //           resSkus.rows.forEach((sku) => {

    //           })
    //           item['skus'] = resSkus.rows;
    //           resolve(item);
    //         })
    //       })
    //     })
    //     ))
    //     .then((res) => {
    //       cb(null, res);
    //     })
    //     .catch((err) => {
    //       cb(err);
    //     })

    //   })

    pool
    .query("SELECT json_agg( json_build_object( 'style_id', styles.style_id, 'name', styles.name, 'original_price', styles.original_price, 'sale_price', styles.sale_price, 'default?', styles.default,'photos', (SELECT coalesce(photos, '[]'::json) FROM (SELECT json_agg(json_build_object( 'thumbnail_url', photos.thumbnail_url,'url', photos.url) ) AS photos from photos WHERE photos.styleId = styles.style_id) as photos),'skus', (SELECT coalesce(skus, '{}'::json) FROM (SELECT json_object_agg(skus.id, json_build_object('quantity', skus.quantity,'size', skus.size)) AS skus from skus WHERE skus.styleId = styles.style_id) as skus))) AS results from styles where styles.productId = $1;", [id])
    .then((result) => {
      result.rows[0]['product_id'] = id;
      cb(null, result.rows[0]);
    })
    .catch((err) => {
      cb(err);
    })
  },

  relatedProd: function(id, cb) {
    // pool
    //   .query('SELECT related_product_id FROM related WHERE current_product_id = $1', [id])
    //   .then ( (result) => {
    //     cb(null, result.rows);
    //   })
    //   .catch((err) => {
    //     cb(err);
    //   })

      // pool
      // .query('SELECT json_agg(row_to_json(r)) FROM (SELECT related_product_id from related where current_product_id = $1)r', [id])
      // .then ( (result) => {
      //   cb(null, result.rows);
      // })
      // .catch((err) => {
      //   cb(err);
      // })

      pool
      .query('SELECT json_agg(related_product_id) AS results from related where related.current_product_id = $1;', [id])
      .then ( (result) => {
        cb(null, result.rows[0].results);
      })
      .catch((err) => {
        cb(err);
      })
  }
}
