using Microsoft.WindowsAzure.Storage.Table;

namespace mtf_mashup.api.Models
{
    public class Selection : TableEntity
    {
        public Selection()
        {
        }

        public Selection(string partitionKey, string rowKey) : base(partitionKey, rowKey)
        {
            this.PartitionKey = partitionKey;
            this.RowKey = rowKey;
        }

        public string Email { get; set; }

        public string PassPhrase { get; set; }

        public string Files { get; set; }
    }
}