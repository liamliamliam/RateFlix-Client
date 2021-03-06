import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { ButtonGroup, Button } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';

function Table_Footer({
  ratings_per_page,
  set_ratings_per_page,
  page_number,
  set_page_number,
  ratings_count
}) {
  const [rpp_list_open, set_rpp_list_open] = useState(false);
  const [page_count, set_page_count] = useState(0);

  const render_pagination = () => {
    console.log('Rendering pagination - page_count:', page_count);
    const buttons = [];
    for (let i = 1; i < page_count + 1; i++) {
      buttons.push(
        <Button
          key={i}
          small
          text={i}
          active={i === page_number}
          onClick={() => set_page_number(i)}
          className='rf-myratings-pagination-button'
        />
      );
    }
    return buttons;
  };

  useEffect(() => {
    set_page_count(Math.ceil(ratings_count / ratings_per_page));
  }, [ratings_count, ratings_per_page]);
  useEffect(() => {
    console.log('ratings count has changed:', ratings_count);
    render_pagination();
  }, [ratings_count, ratings_per_page]);

  const display_pagination = ratings_count > ratings_per_page;

  return (
    <tfoot>
      <tr>
        <td colSpan={7}>
          <Row>
            <Col span={4}>Total: {ratings_count}</Col>
            <Col span={16} className='ta-c'>
              {display_pagination && (
                <ButtonGroup minimal className='ta-c'>
                  {page_number > 1 && (
                    <Button
                      small
                      icon='chevron-left'
                      text='Previous'
                      onClick={() => set_page_number(page_number - 1)}
                    />
                  )}
                  {render_pagination()}
                  {page_number < page_count && (
                    <Button
                      small
                      rightIcon='chevron-right'
                      text='Next'
                      onClick={() => set_page_number(page_number + 1)}
                    />
                  )}
                </ButtonGroup>
              )}
            </Col>
            <Col span={4} className='ta-r'>
              <Popover2
                isOpen={rpp_list_open}
                placement='top-end'
                captureDismiss
                backdropProps={{
                  onClick: () => set_rpp_list_open(false)
                }}
                content={
                  <ButtonGroup minimal vertical>
                    {[10, 25, 50].map((rpp, i) => (
                      <Button
                        text={rpp}
                        intent={ratings_per_page === rpp ? 'primary' : ''}
                        key={i}
                        onClick={() => {
                          set_ratings_per_page(rpp);
                          set_rpp_list_open(false);
                          set_page_count(Math.ceil(ratings_count / rpp));
                        }}
                      />
                    ))}
                  </ButtonGroup>
                }
              >
                <Button
                  small
                  text={`${ratings_per_page}/Page`}
                  onClick={() => set_rpp_list_open(!rpp_list_open)}
                />
              </Popover2>
            </Col>
          </Row>
        </td>
      </tr>
    </tfoot>
  );
}

export default Table_Footer;
