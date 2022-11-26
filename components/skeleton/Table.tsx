const TableLoading = ({ colLength }: { colLength: number }) => {
  return (
    <>
      {Array(5)
        .fill("")
        .map((d, i) => (
          <tr key={i} className="animate-pulse">
            {Array(colLength)
              .fill("")
              .map((data, index) => (
                <td key={index} className=" rounded py-4 px-6 ">
                  <div className="h-2 bg-slate-200 rounded"></div>
                </td>
              ))}
          </tr>
        ))}
    </>
  );
};

export default TableLoading;
