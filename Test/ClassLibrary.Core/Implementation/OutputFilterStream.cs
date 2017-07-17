using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Core.Implementation
{
    public class OutputFilterStream : Stream
    {
        private readonly Stream InnerStream;
        private readonly MemoryStream CopyStream;

        private Guid _requestToken = Guid.Empty;
        public Guid RequestToken
        {
            get
            {
                return _requestToken;
            }
        }

        public OutputFilterStream(Stream inner)
        {
            _requestToken = Guid.NewGuid();
            this.InnerStream = inner;
            this.CopyStream = new MemoryStream();
        }

        public string ReadStream()
        {
            lock (this.InnerStream)
            {
                if (this.CopyStream.Length <= 0L ||
                    !this.CopyStream.CanRead ||
                    !this.CopyStream.CanSeek)
                {
                    return String.Empty;
                }

                long pos = this.CopyStream.Position;
                this.CopyStream.Position = 0L;
                try
                {
                    return new StreamReader(this.CopyStream).ReadToEnd();
                }
                finally
                {
                    try
                    {
                        this.CopyStream.Position = pos;
                    }
                    catch { }
                }
            }
        }


        public override bool CanRead
        {
            get { return this.InnerStream.CanRead; }
        }

        public override bool CanSeek
        {
            get { return this.InnerStream.CanSeek; }
        }

        public override bool CanWrite
        {
            get { return this.InnerStream.CanWrite; }
        }

        public override void Flush()
        {
            this.InnerStream.Flush();
        }

        public override long Length
        {
            get
            {
                try
                {
                    return this.InnerStream.Length;
                }
                catch (NotSupportedException ex)
                {
                    return default(long);
                }
            }
        }

        public override long Position
        {
            get
            {
                try
                {
                    return this.InnerStream.Position;
                }
                catch (NotSupportedException ex)
                {
                    return default(long);
                }
            }
            set { this.CopyStream.Position = this.InnerStream.Position = value; }
        }

        public override int Read(byte[] buffer, int offset, int count)
        {
            return this.InnerStream.Read(buffer, offset, count);
        }

        public override long Seek(long offset, SeekOrigin origin)
        {
            this.CopyStream.Seek(offset, origin);
            return this.InnerStream.Seek(offset, origin);
        }

        public override void SetLength(long value)
        {
            this.CopyStream.SetLength(value);
            this.InnerStream.SetLength(value);
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
            this.CopyStream.Write(buffer, offset, count);
            this.InnerStream.Write(buffer, offset, count);
        }
    }
}
