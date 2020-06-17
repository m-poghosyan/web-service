import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {
  editChartData,
  editChartById,
} from '../../redux/data-table/data-table-actions';

const ChartData = ({
  data,
  type,
  editChartById,
  editableChartData,
  editChartData,
}) => {
  const [editableValue, setEditableValue] = useState(null);

  const handleEdit = (e, item, type) => {
    setEditableValue(item.stocks[type]);
    editChartById({ index: item.index, type });
  };

  const handleChange = (e) => {
    setEditableValue(e.target.value);
  };

  const confirmEditValue = (e, item, type) => {
    if (e.key === 'Enter') {
      editChartById(null);
      editChartData({ id: item.index, type, value: editableValue });
    }
  };

  return (
    <tr>
      <th>{type}</th>
      {data?.map((item, index) => (
        <Fragment key={index}>
          {item.index === editableChartData?.index &&
          type === editableChartData?.type ? (
            <td>
              <input
                value={editableValue}
                type='text'
                onChange={handleChange}
                onKeyUp={(e) => confirmEditValue(e, item, type)}
                autoFocus
              />
            </td>
          ) : (
            <td
              key={item.index}
              onClick={(e) => handleEdit(e, item, type)}
              onChange={handleChange}
              onKeyUp={confirmEditValue}
            >
              {+item.stocks[type]}
            </td>
          )}
        </Fragment>
      ))}
    </tr>
  );
};

const mapStateToProps = ({ dataTableReducer: { editableChartData } }) => ({
  editableChartData,
});

const mapDispatchToProps = (dispatch) => ({
  editChartById: (id) => dispatch(editChartById(id)),
  editChartData: (item) => dispatch(editChartData(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartData);
