// DataTable.tsx - Fixed reusable component
import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Types for the data table
export interface Column<T = any> {
  key: string;
  title: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  searchable?: boolean;
  sortable?: boolean;
  width?: string;
}

// Fixed ActionButton interface - all properties that depend on record should be functions
export interface ActionButton<T = any> {
  key: string;
  label: string | ((record: T) => string);
  icon: React.ReactNode | ((record: T) => React.ReactNode);
  onClick: (record: T) => void;
  className?: string | ((record: T) => string);
  condition?: (record: T) => boolean;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  error?: string | null;
  title: string;
  description?: string;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  actions?: ActionButton<T>[];
  onRetry?: () => void;
  searchableFields?: string[];
  emptyStateIcon?: React.ReactNode;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  error = null,
  title,
  description,
  searchPlaceholder = "Search...",
  itemsPerPage = 1,
  actions = [],
  onRetry,
  searchableFields = [],
  emptyStateIcon,
  emptyStateTitle = "No data available",
  emptyStateDescription = "No records have been added yet."
}: DataTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const searchLower = searchTerm.toLowerCase().trim();
    
    return data.filter((record) => {
      // If searchableFields is specified, only search in those fields
      const fieldsToSearch = searchableFields.length > 0 
        ? searchableFields 
        : columns.filter(col => col.searchable !== false).map(col => col.key);

      return fieldsToSearch.some(field => {
        const value = record[field];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [data, searchTerm, searchableFields, columns]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Helper function to resolve dynamic values
  const resolveValue = <K,>(value: K | ((record: T) => K), record: T): K => {
    return typeof value === 'function' ? (value as (record: T) => K)(record) : value;
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen p-4 lg:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="pt-12 lg:pt-0">
            <div className="bg-white rounded-lg shadow-sm border border-red-200 p-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <X size={32} className="text-red-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Data</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Retry
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 lg:p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 pt-12 lg:pt-0">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">{title}</h1>
          {description && <p className="text-gray-600">{description}</p>}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-600">
              Showing {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for "{searchTerm}"
            </p>
          )}
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ width: column.width }}
                    >
                      {column.title}
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={columns.length + 1 + (actions.length > 0 ? 1 : 0)} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                        <p>Loading...</p>
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((record, index) => (
                    <tr key={record.id || index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      {columns.map((column) => (
                        <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                          {column.render 
                            ? column.render(record[column.key], record, index)
                            : <span className="text-sm text-gray-900">{record[column.key]}</span>
                          }
                        </td>
                      ))}
                      {actions.length > 0 && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {actions.map((action) => {
                              const shouldShow = action.condition ? action.condition(record) : true;
                              if (!shouldShow) return null;
                              
                              const label = resolveValue(action.label, record);
                              const icon = resolveValue(action.icon, record);
                              const className = resolveValue(
                                action.className || 'bg-blue-500 hover:bg-blue-600 text-white',
                                record
                              );
                              
                              return (
                                <button
                                  key={action.key}
                                  onClick={() => action.onClick(record)}
                                  className={`inline-flex items-center justify-center p-2 rounded-full transition-all duration-200 hover:scale-110 ${className}`}
                                  title={label}
                                >
                                  {icon}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length + 1 + (actions.length > 0 ? 1 : 0)} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        {emptyStateIcon && <div className="mb-4">{emptyStateIcon}</div>}
                        <p className="text-lg font-medium mb-1">
                          {searchTerm ? 'No results found' : emptyStateTitle}
                        </p>
                        <p className="text-sm">
                          {searchTerm 
                            ? `No records match "${searchTerm}". Try adjusting your search criteria.`
                            : emptyStateDescription
                          }
                        </p>
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm('')}
                            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Clear Search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{' '}
                      <span className="font-medium">
                        {(currentPage - 1) * itemsPerPage + 1}
                      </span>{' '}
                      to{' '}
                      <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, filteredData.length)}
                      </span>{' '}
                      of{' '}
                      <span className="font-medium">{filteredData.length}</span>{' '}
                      results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;