import { Pencil, Trash2 } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

interface EntityTableProps<T> {
  title: string;
  data: T[];
  columns: { key: keyof T; label: string }[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  emptyText?: string;
  pagination?: PaginationProps;
}

const EntityTable = <T,>({
  title,
  data,
  columns,
  onEdit,
  onDelete,
  emptyText = "No data available",
  pagination,
}: EntityTableProps<T>) => {
  const totalPages = pagination ? Math.ceil(pagination.totalItems / pagination.pageSize) : 0;

  return (
    <div className="mt-6 w-full">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}

      {data.length === 0 ? (
        <p className="text-gray-500">{emptyText}</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key as string}
                      className="px-4 py-2 whitespace-nowrap font-semibold text-gray-700"
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="px-4 py-2 whitespace-nowrap font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key as string}
                        className="px-4 py-2 whitespace-nowrap text-gray-800"
                      >
                        {item[col.key]}
                      </td>
                    ))}
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEdit(item)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(item)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Numbered Pagination Controls */}
          {pagination && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => pagination.onPageChange(pageNum)}
                  className={`px-3 py-1 border rounded ${
                    pagination.currentPage === pageNum
                      ? "bg-blue-600 text-white font-semibold"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EntityTable;
