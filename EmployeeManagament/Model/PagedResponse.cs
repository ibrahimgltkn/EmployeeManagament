namespace EmployeeManagament.Model
{
    public class PagedResponse<T>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPage { get; set; }
        public IEnumerable<T> List { get; set; }
    }
}
